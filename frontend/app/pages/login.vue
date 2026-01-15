<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Вход в систему</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="example@mail.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {{ isLoading ? 'Входим...' : 'Войти' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Нет аккаунта? 
        <NuxtLink to="/register" class="text-indigo-600 hover:underline">Зарегистрироваться</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // 1. Отправляем запрос на вход
    const { error: authError } = await authClient.signIn.email({
      email: email.value,
      password: password.value,
    });

    if (authError) {
      console.error("Ошибка входа:", authError);
      error.value = authError.message || 'Неверный логин или пароль';
      isLoading.value = false;
      return;
    }

    // 2. Вход успешен (сервер ответил 200)
    console.log("Вход успешен. Обновляем сессию...");

    // 3. КРИТИЧЕСКИЙ МОМЕНТ:
    // Принудительно запрашиваем сессию, чтобы клиент Nuxt понял, что мы вошли
    await authClient.getSession({
      fetchOptions: { headers: { 'Cache-Control': 'no-cache' } }
    });

    console.log("Сессия обновлена. Переходим в профиль...");
    
    // 4. Делаем редирект
    await router.push('/profile');

  } catch (e) {
    console.error("Неожиданная ошибка:", e);
    error.value = "Произошла ошибка при обработке входа";
  } finally {
    isLoading.value = false;
  }
};
</script>