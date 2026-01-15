// lib/auth-client.ts
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
    // Указываем адрес твоего HONO сервера
    baseURL: "https://api.gocyxapik.pp.ua",
});

export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient;