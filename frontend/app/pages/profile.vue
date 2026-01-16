<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

// 1. Интерфейс (Types)
interface UserProfile {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
  }
}

const isLoggingOut = ref(false)

// 2. Middleware
definePageMeta({
  // Если у тебя layout называется 'default', эту строку можно даже не писать,
  // Nuxt подставит его сам. Но для ясности оставим.
  layout: 'default', 
  middleware: async () => {
    const { data } = await authClient.getSession({
      fetchOptions: { headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined }
    })
    if (!data) return navigateTo('/login')
  }
})

// 3. Загрузка данных
const { data: profile, status, error, refresh } = await useFetch<UserProfile>('https://gocyxapik.pp.ua/api/me', {
  headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined,
  key: 'user-profile'
})

// 4. Логика выхода
const handleLogout = async () => {
  isLoggingOut.value = true
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo('/login')
      }
    }
  })
}
</script>

<template>
  <!-- 
    Убрали min-h-screen и flex-center. 
    Теперь просто отступы сверху/снизу (py-12), чтобы контент не прилипал к хедеру.
  -->
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-md mx-auto">
      
      <!-- СТАТУС: ЗАГРУЗКА -->
      <div v-if="status === 'pending'" class="bg-white p-8 rounded-xl shadow w-full animate-pulse">
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
        </div>
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>

      <!-- СТАТУС: ОШИБКА -->
      <div v-else-if="error" class="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
        <h2 class="text-lg font-bold text-red-600 mb-2">Не удалось загрузить профиль</h2>
        <p class="text-sm text-red-800 mb-4">{{ error.message }}</p>
        <button @click="() => refresh()" class="px-4 py-2 bg-white border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition">
          Повторить
        </button>
      </div>

      <!-- СТАТУС: ДАННЫЕ -->
      <div v-else-if="profile?.user" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <!-- Верхняя часть (Обложка + Аватар) -->
        <div class="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
           <!-- Можно сюда добавить кнопку редактирования обложки в будущем -->
        </div>
        
        <div class="relative px-6 pb-6">
          <!-- Аватарка (сдвинута вверх на обложку) -->
          <div class="relative -mt-12 mb-4 flex justify-center">
            <div class="p-1 bg-white rounded-full">
              <img 
                v-if="profile.user.image" 
                :src="profile.user.image" 
                alt="Avatar"
                class="w-24 h-24 rounded-full object-cover border border-gray-200" 
              />
              <div v-else class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold border border-gray-200">
                {{ profile.user.name?.charAt(0)?.toUpperCase() ?? 'U' }}
              </div>
            </div>
          </div>

          <!-- Текстовые данные -->
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">{{ profile.user.name }}</h1>
            <p class="text-sm text-gray-500">{{ profile.user.email }}</p>
            
            <!-- Пример бейджика (например, роль) -->
            <span class="mt-2 inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
              Пользователь
            </span>
          </div>

          <!-- Техническая информация (ID) -->
          <div class="bg-gray-50 rounded-lg p-3 mb-6 flex justify-between items-center text-xs text-gray-500">
            <span>ID Аккаунта:</span>
            <span class="font-mono bg-white px-2 py-1 rounded border border-gray-200 select-all">
              {{ profile.user.id }}
            </span>
          </div>

          <!-- Кнопки -->
          <div class="space-y-3">
             <!-- Можно добавить кнопку "Настройки" -->
            <!-- <button class="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
               Редактировать профиль
            </button> -->

            <button 
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="w-full py-2.5 px-4 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition flex justify-center items-center gap-2 disabled:opacity-50"
            >
              <span v-if="isLoggingOut" class="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
              {{ isLoggingOut ? 'Выход...' : 'Выйти' }}
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>