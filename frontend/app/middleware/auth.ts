// middleware/auth.ts
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Используем useFetch для SSR-совместимой проверки сессии
    const { data: session } = await authClient.useSession(useFetch);

    // Если сессии нет, отправляем на логин
    if (!session.value) {
        return navigateTo('/login');
    }
});