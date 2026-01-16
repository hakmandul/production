<script setup lang="ts">
import { signIn } from '~/lib/auth-client'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  await signIn.email({
    email: email.value,
    password: password.value,
  }, {
    onSuccess: () => {
      router.push('/profile')
    },
    onError: (ctx) => {
      alert(ctx.error.message) // Лучше вывести в UI, но для примера alert
      isLoading.value = false
    }
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Вход</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Пароль</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {{ isLoading ? 'Входим...' : 'Войти' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта? 
        <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          Регистрация
        </NuxtLink>
      </p>
    </div>
  </div>
</template>