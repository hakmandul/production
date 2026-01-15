<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-6">
      <h1 class="text-4xl font-bold text-gray-900">Better Auth + Nuxt</h1>
      <p class="text-gray-600">Демонстрация работы с Hono Backend</p>

      <!-- ИСПРАВЛЕНО: используем isPending -->
      <div v-if="isPending" class="text-gray-400">Загрузка...</div>

      <!-- Пользователь залогинен -->
      <div v-else-if="session" class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <img 
          v-if="session.user.image" 
          :src="session.user.image" 
          class="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-indigo-500"
        />
        <div v-else class="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
          👤
        </div>
        
        <p class="text-xl font-semibold text-gray-800">{{ session.user.name }}</p>
        <p class="text-sm text-gray-500 mb-6">{{ session.user.email }}</p>
        
        <div class="flex gap-3 justify-center">
          <NuxtLink to="/profile" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Профиль
          </NuxtLink>
          <button @click="handleSignOut" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Выйти
          </button>
        </div>
      </div>

      <!-- Гость -->
      <div v-else class="space-y-4">
        <NuxtLink to="/login" class="block w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Войти
        </NuxtLink>
        <NuxtLink to="/register" class="block w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
          Регистрация
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

// ИСПРАВЛЕНО: destructuring 'isPending' instead of 'pending'
const { data: session, isPending } = await authClient.useSession(useFetch);

const handleSignOut = async () => {
  await authClient.signOut();
  window.location.reload(); 
};
</script>