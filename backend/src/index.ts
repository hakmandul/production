// src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger"; // <--- 1. Импорт
import { auth } from "./lib/auth"; // Ваш файл auth.ts

const app = new Hono();
app.use(logger()); 


// ==========================================
// 1. CORS CONFIGURATION
// ==========================================
// Используем функцию для origin, чтобы пускать и www, и без www
app.use(
  "/api/*",
  cors({
    origin: (origin) => {
      // Список разрешенных доменов (должен совпадать с trustedOrigins в auth.ts)
      const allowed = ["https://gocyxapik.pp.ua", "https://www.gocyxapik.pp.ua"];
      
      // Если origin в списке, возвращаем его, иначе null (блокируем)
      return allowed.includes(origin) ? origin : null;
    },
    allowHeaders: ["Content-Type", "Authorization", "Cache-Control"], 
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true, // ОБЯЗАТЕЛЬНО для работы Cross-Subdomain cookies
  })
);

// ==========================================
// 2. MOUNT BETTER-AUTH
// ==========================================
// Важно: в auth.ts убедитесь, что не переопределен basePath.
// По умолчанию он "/api/auth", что совпадает с этим роутом.
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

// ==========================================
// 3. PROTECTED ROUTES
// ==========================================
app.get("/api/me", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ user: session.user });
});

// Простой хелс-чек, чтобы видеть, что бэк жив
app.get("/", (c) => c.text("Backend is running"));

Bun.serve({
  port: 3001, // Совпадает с upstream backend_bun в Nginx
  fetch: app.fetch,
});
console.log("🚀 Backend running on http://localhost:3001");
