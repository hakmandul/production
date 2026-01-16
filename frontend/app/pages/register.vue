<script setup lang="ts">
import { signUp } from '~/lib/auth-client'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  isLoading.value = true
  await signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
    image: undefined // Можно добавить загрузку аватарки позже
  }, {
    onRequest: () => {
      // Можно очистить ошибки
    },
    onSuccess: () => {
      router.push('/') // После регистрации кидаем на главную
    },
    onError: (ctx) => {
      alert(ctx.error.message)
      isLoading.value = false
    }
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Регистрация</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Имя</label>
          <input 
            v-model="name" 
            type="text" 
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Иван Иванов"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Пароль</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isLoading ? 'Создаем аккаунт...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Уже есть аккаунт? 
        <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Войти
        </NuxtLink>
      </p>
    </div>
  </div>
</template>