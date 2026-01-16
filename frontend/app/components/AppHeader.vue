<script setup lang="ts">
import { useUser } from '~/composables/useUser';

// Нам больше не нужны импорты authClient здесь для ЧТЕНИЯ данных
// Мы просто берем глобального юзера
const user = useUser()
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600 tracking-tight">
            GoCyxapik
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          
          <!-- АВТОРИЗОВАН (user не null) -->
          <div v-if="user" class="flex items-center gap-4">
             <NuxtLink to="/profile" class="flex items-center gap-2 group">
                <span class="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {{ user.name }}
                </span>
                
                <img 
                  v-if="user.image"
                  class="h-9 w-9 rounded-full border border-gray-300 group-hover:ring-2 group-hover:ring-blue-500 transition"
                  :src="user.image"
                  alt="Avatar"
                />
                <div v-else class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold group-hover:ring-2 group-hover:ring-blue-500 transition">
                   {{ user.name?.charAt(0)?.toUpperCase() ?? 'U' }}
                </div>
             </NuxtLink>
          </div>

          <!-- ГОСТЬ -->
          <div v-else class="flex items-center gap-3">
            <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900 font-medium text-sm transition">
              Войти
            </NuxtLink>
            <NuxtLink to="/register" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
              Регистрация
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </header>
</template>