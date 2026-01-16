// index.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { auth } from "./lib/auth"; // Импорт настроенного auth

const app = new Hono();

// 1. Логгер (полезно для дебага через journalctl)
app.use("*", logger());

// 2. CORS
// Nginx обрабатывает опции, но Hono тоже должен разрешать ориджин
app.use(
    "/api/*",
    cors({
        origin: ["https://gocyxapik.pp.ua", "https://www.gocyxapik.pp.ua"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true, // ВАЖНО для кук
    })
);

// 3. Подключение Better-Auth
// Мы "слушаем" все запросы на /api/auth/* и передаем их в хендлер
app.on(["POST", "GET"], "/api/auth/**", (c) => {
    return auth.handler(c.req.raw);
});

// Пример защищенного роута
app.get("/api/me", async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });
    
    if (!session) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    
    return c.json({ user: session.user });
});

export default {
    port: 3001,
    fetch: app.fetch,
};