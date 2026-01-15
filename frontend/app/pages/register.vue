<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Создать аккаунт</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Иван Иванов" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="example@mail.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input v-model="form.password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div v-if="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{{ error }}</div>

        <button type="submit" :disabled="isLoading" class="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Уже есть аккаунт? <NuxtLink to="/login" class="text-indigo-600 hover:underline">Войти</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const form = reactive({ name: '', email: '', password: '' });
const isLoading = ref(false);
const error = ref<string | null>(null);
const router = useRouter();

const handleRegister = async () => {
  isLoading.value = true;
  error.value = null;

  const { error: authError } = await authClient.signUp.email({
    email: form.email,
    password: form.password,
    name: form.name,
  });

  if (authError) {
    // ИСПРАВЛЕНО: Добавили запасной текст ошибки
    error.value = authError.message || 'Ошибка при регистрации';
    isLoading.value = false;
  } else {
    router.push('/profile');
  }
};
</script>