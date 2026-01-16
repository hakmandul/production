<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

// 1. Простая защита: нет сессии — иди на логин
definePageMeta({
  middleware: async () => {
    const { data } = await authClient.useSession(useFetch)
    if (!data.value) return navigateTo('/login')
  }
})

// 2. Запрос к твоему Hono API
// headers нужны, чтобы Hono понял, кто делает запрос при обновлении страницы (SSR)
const { data: profile } = await useFetch('https://gocyxapik.pp.ua/api/me', {
  headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    
    <!-- Если данные есть -->
    <div v-if="profile" class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Профиль</h1>

      <div class="space-y-4">
        <!-- Аватарка -->
        <div class="flex justify-center">
          <img 
            v-if="profile.user.image" 
            :src="profile.user.image" 
            class="w-20 h-20 rounded-full border-2 border-blue-500" 
          />
          <div v-else class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {{ profile.user.name[0] }}
          </div>
        </div>

        <!-- Данные -->
        <div>
          <label class="text-sm text-gray-500">Имя</label>
          <p class="font-medium text-lg">{{ profile.user.name }}</p>
        </div>

        <div>
          <label class="text-sm text-gray-500">Email</label>
          <p class="font-medium text-lg">{{ profile.user.email }}</p>
        </div>
        
        <NuxtLink to="/" class="block text-center text-blue-600 hover:underline mt-4">
          На главную
        </NuxtLink>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-else class="text-gray-500">
      Загрузка данных...
    </div>

  </div>
</template>