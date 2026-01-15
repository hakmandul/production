// middleware/auth.ts
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // 1. Принудительно запрашиваем сессию с сервера
    // Мы используем await, чтобы Nuxt ЖДАЛ ответа, прежде чем рисовать страницу
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: {
                // Важно: запрещаем кеширование, чтобы браузер не вернул старое "null"
                'Cache-Control': 'no-cache' 
            }
        }
    });

    // 2. Если сервер ответил "null" (нет данных) — выгоняем на логин
    if (!data) {
        return navigateTo('/login');
    }

    // 3. Если данные есть — пускаем дальше
});