// app/composables/useUser.ts

// Определяем интерфейс пользователя, чтобы TypeScript помогал
export interface User {
    id: string
    name: string
    email: string
    image?: string | null
}

// Создаем глобальный стейт 'user'. По умолчанию он null.
export const useUser = () => useState<User | null>('global-user', () => null)