<script setup lang="ts">
import { authClient } from '~/lib/auth-client'
import { useRouter } from 'vue-router'

// SSR магия: передаем useFetch, чтобы сессия подтянулась на сервере
const { data: session } = await authClient.useSession(useFetch)
const router = useRouter()

const handleLogout = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/login')
      }
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Карточка приветствия -->
      <div v-if="session" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center space-x-4">
          <!-- Аватарка или заглушка -->
          <div v-if="session.user.image" class="shrink-0">
             <img :src="session.user.image" class="h-16 w-16 rounded-full object-cover" alt="Avatar" />
          </div>
          <div v-else class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
            {{ session.user.name.charAt(0).toUpperCase() }}
          </div>
          
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Привет, {{ session.user.name }}!</h1>
            <p class="text-gray-500">{{ session.user.email }}</p>
          </div>
        </div>

        <div class="mt-8 border-t pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Данные сессии (Debug):</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">{{ session }}</pre>
        </div>

        <div class="mt-6">
            <button 
              @click="handleLogout"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Выйти
            </button>
        </div>
      </div>

      <!-- Состояние для гостей -->
      <div v-else class="text-center py-20">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Добро пожаловать</h1>
        <p class="text-gray-600 mb-8">Для доступа к контенту необходимо авторизоваться.</p>
        <div class="space-x-4">
          <NuxtLink to="/login" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Войти
          </NuxtLink>
          <NuxtLink to="/register" class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Регистрация
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>