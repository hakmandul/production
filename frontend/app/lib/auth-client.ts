import { createAuthClient } from "better-auth/vue"

export const authClient = createAuthClient({
    // ОЧЕНЬ ВАЖНО: Указываем внешний URL твоего API через Nginx.
    // Твой Nginx перенаправит /api/ -> на Hono (3001)
    baseURL: "https://gocyxapik.pp.ua/api/auth" 
})

// Экспортируем методы для удобства
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient;