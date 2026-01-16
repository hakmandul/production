import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Список публичных страниц
    const publicPages = ['/login', '/register', '/'];
    
    if (publicPages.includes(to.path)) {
        return;
    }

    // Проверяем сессию с SSR поддержкой
    const { data: session } = await authClient.useSession(useFetch);
    
    if (!session.value) {
        return navigateTo('/login');
    }
});