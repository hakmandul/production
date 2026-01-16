<script setup lang="ts">
import { authClient } from '~/lib/auth-client'
import { useUser } from './composables/useUser'

// 1. Получаем доступ к нашему глобальному стейту
const user = useUser()

// 2. Загружаем сессию (ОДИН РАЗ при загрузке сайта)
// useAsyncData гарантирует, что данные загрузятся на сервере и передадутся в браузер
const { data: session } = await useAsyncData('auth-init', async () => {
    const { data } = await authClient.getSession({
        fetchOptions: {
            headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined
        }
    })
    return data
})

// 3. Если сессия есть, обновляем глобального юзера
// watchEffect нужен, чтобы обновлять стейт, если better-auth сам что-то изменит
watchEffect(() => {
    if (session.value?.user) {
        user.value = session.value.user
    } else {
        user.value = null
    }
})
</script>

<template>
  <div>
    <!-- Полоска загрузки сверху -->
    <NuxtLoadingIndicator />
    
    <!-- Твой лейаут (Хедер, Футер) -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>