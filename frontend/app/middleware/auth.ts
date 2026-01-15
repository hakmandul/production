import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // Используем getSession вместо useSession внутри middleware для надежности
    const { data: session } = await authClient.getSession();

    if (!session) {
        return navigateTo('/login');
    }
});