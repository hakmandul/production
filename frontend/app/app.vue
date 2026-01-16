<script setup lang="ts">
import { authClient } from '~/lib/auth-client'
import { useUser } from './composables/useUser'

const user = useUser()

// --- ЧАСТЬ 1: SSR (Сервер) ---
// Загружаем данные один раз при генерации HTML, чтобы хедер сразу был правильным
if (import.meta.server) {
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: useRequestHeaders(['cookie']) // Пробрасываем куки
        }
    })
    if (data) {
        user.value = data.user
    }
}

// --- ЧАСТЬ 2: Реактивность (Клиент) ---
// Хук useSession сам следит за логином/логаутом
const { data: session } = authClient.useSession()

// Как только session изменится (вход/выход), обновляем нашего глобального user
watch(session, (newSession) => {
    if (newSession?.user) {
        user.value = newSession.user
    } else {
        user.value = null
    }
}, { immediate: true }) // immediate: true важно, чтобы сработало и при первой загрузке на клиенте
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>