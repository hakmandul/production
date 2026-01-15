<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Личный кабинет</h1>
        <NuxtLink to="/" class="text-indigo-600 hover:underline">← На главную</NuxtLink>
      </div>

      <!-- Карточка профиля -->
      <div v-if="session" class="bg-white rounded-xl shadow overflow-hidden">
        <div class="bg-indigo-600 px-6 py-4">
          <h2 class="text-white text-lg font-medium">Информация о пользователе</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-500">ID пользователя</label>
            <p class="mt-1 text-gray-900 font-mono bg-gray-100 p-2 rounded">{{ session.user.id }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500">Email</label>
            <p class="mt-1 text-gray-900">{{ session.user.email }}</p>
          </div>
          <div>
             <label class="block text-sm font-medium text-gray-500">Имя</label>
             <p class="mt-1 text-gray-900">{{ session.user.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500">Статус верификации</label>
            <span 
              :class="session.user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
            >
              {{ session.user.emailVerified ? 'Подтвержден' : 'Не подтвержден' }}
            </span>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button @click="handleSignOut" class="text-red-600 hover:text-red-800 text-sm font-medium">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

// Подключаем Middleware защиты
definePageMeta({
  middleware: 'auth'
});

// SSR-friendly получение данных
const { data: session } = await authClient.useSession(useFetch);
const router = useRouter();

const handleSignOut = async () => {
  await authClient.signOut();
  router.push('/login');
};
</script>