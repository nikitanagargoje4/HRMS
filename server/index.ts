import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Support hosting the client under a configurable subpath (e.g. /hrms on cPanel).
// Use APP_BASE_PATH env var to control the mount point. Default is /hrms.
const APP_BASE_PATH = process.env.APP_BASE_PATH || "/hrms";

// Rewrite requests coming in as `${APP_BASE_PATH}/api/...` to `/api/...` so our
// existing Express routes continue to match. This middleware must run before
// routes are registered.
app.use((req, _res, next) => {
  try {
    if (req.path.startsWith(`${APP_BASE_PATH}/api`)) {
      // mutate url so downstream route handlers see /api/...
      req.url = req.url.replace(new RegExp(`^${APP_BASE_PATH}`), "");
    }
  } catch (e) {
    // if regex fails for any reason, just continue without rewriting
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  (res as any).on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${(res as any).statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  // (subpath rewrite middleware moved earlier so it runs before routes are registered)

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, attempt to serve the built client under the configured base path.
    // If serveStatic fails (for example, dist not uploaded in this deployment),
    // catch the error and continue so the API remains available instead of
    // crashing the Node process.
    try {
      serveStatic(app);
    } catch (e) {
      console.error("serveStatic failed:", e);
      // continue - APIs will still be available; static files may be served by Apache
    }
  }

  // Use configurable port/host for better cPanel compatibility
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  const host = process.env.HOST || "0.0.0.0";
  server.listen({
    port,
    host,
  }, () => {
    log(`serving on ${host}:${port}`);
  });
})();
