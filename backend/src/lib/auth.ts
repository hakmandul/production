// auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; 
import * as schema from "../db/schema"; 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // Или "postgres-js" в зависимости от драйвера
        schema: {
            // Маппинг таблиц, если названия совпадают с дефолтными better-auth, можно опустить, но лучше оставить для явности
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    // ВАЖНО: Указываем полный путь, так как Nginx проксирует /api/ -> backend
    basePath: "/api/auth", 
    trustedOrigins: ["https://gocyxapik.pp.ua", "https://www.gocyxapik.pp.ua"],
    advanced: {
        // Поскольку Nginx передает заголовки X-Forwarded-Proto, Better-Auth обычно сам понимает, 
        // что это HTTPS, но для гарантии можно настроить куки:
        cookiePrefix: "gocyxapik-auth", // Хорошая практика иметь уникальный префикс
        useSecureCookies: true, // ОБЯЗАТЕЛЬНО true для продакшена (HTTPS)
    }
});