<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="max-w-3xl mx-auto space-y-6">
      
      <!-- Заголовок -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-slate-800">🔍 Диагностика сессии</h1>
        <NuxtLink to="/" class="text-blue-600 hover:underline">На главную</NuxtLink>
      </div>

      <!-- Блок 1: Статус -->
      <!-- В шаблоне .value не нужен, Vue сам понимает реактивность -->
      <div class="bg-white rounded-xl shadow p-6 border-l-4" 
        :class="getStatusColorClass">
        <h2 class="text-lg font-semibold mb-2">Текущее состояние:</h2>
        
        <!-- Логика загрузки: или первичная загрузка (isPending), или ручное обновление (isRefetching) -->
        <div v-if="isPending || isRefetching" class="flex items-center gap-2 text-slate-500">
          <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Загрузка данных с API...
        </div>

        <div v-else-if="error" class="text-red-600">
          ❌ Ошибка запроса: {{ error.message || 'Неизвестная ошибка' }}
        </div>

        <div v-else-if="session" class="text-green-700 flex items-center gap-2">
          ✅ Авторизован (Session Active)
        </div>

        <div v-else class="text-amber-600 flex items-center gap-2">
          🔒 Не авторизован (Guest)
        </div>
      </div>

      <!-- Блок 2: Панель управления -->
      <div class="bg-white rounded-xl shadow p-6 flex gap-4">
        <button 
          @click="refreshSession" 
          :disabled="isPending || isRefetching"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          🔄 Обновить данные (Refetch)
        </button>

        <button 
          v-if="session"
          @click="handleSignOut" 
          class="px-4 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50 transition"
        >
          🚪 Выйти (Sign Out)
        </button>
        
        <NuxtLink 
          v-if="!session" 
          to="/login"
          class="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition"
        >
          Войти
        </NuxtLink>
      </div>

      <!-- Блок 3: Данные пользователя (если есть) -->
      <div v-if="session" class="bg-white rounded-xl shadow overflow-hidden">
        <div class="bg-slate-50 px-6 py-3 border-b border-slate-200 font-semibold text-slate-700">
          👤 User Object
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span class="text-slate-500 text-sm">ID:</span> <div class="font-mono text-sm bg-slate-100 p-1 rounded">{{ session.user.id }}</div></div>
          <div><span class="text-slate-500 text-sm">Name:</span> <div>{{ session.user.name }}</div></div>
          <div><span class="text-slate-500 text-sm">Email:</span> <div>{{ session.user.email }}</div></div>
          <div><span class="text-slate-500 text-sm">Email Verified:</span> <div>{{ session.user.emailVerified }}</div></div>
        </div>
      </div>

      <!-- Блок 4: Сырой JSON (Debug) -->
      <div class="bg-slate-800 rounded-xl shadow overflow-hidden text-slate-300">
        <div class="bg-slate-900 px-6 py-3 border-b border-slate-700 font-mono text-sm flex justify-between">
          <span>RAW JSON RESPONSE</span>
          <span class="text-xs text-slate-500">api/auth/session</span>
        </div>
        <div class="p-6 overflow-x-auto">
          <pre v-if="session" class="text-xs leading-5 font-mono">{{ JSON.stringify(session, null, 2) }}</pre>
          <div v-else class="text-slate-500 italic text-sm">null</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from '~/lib/auth-client';

// 1. Получаем сессию
// Из-за 'await' isPending возвращается как boolean (false), а не Ref
// session и error остаются Ref-ами
const { 
  data: session, 
  isPending, 
  error 
} = await authClient.useSession(useFetch);

// Добавляем локальное состояние для кнопки обновления
const isRefetching = ref(false);

// Вычисляемое свойство для цвета
const getStatusColorClass = computed(() => {
  // ВАЖНО: 
  // isPending - это boolean, поэтому пишем без .value
  // isRefetching - это Ref, поэтому пишем .value
  if (isPending || isRefetching.value) return 'border-blue-500';
  
  // session и error - это Ref, нужны .value
  if (error.value) return 'border-red-500';
  if (session.value) return 'border-green-500';
  
  return 'border-amber-500';
});

// Функция ручного обновления
const refreshSession = async () => {
  isRefetching.value = true;
  try {
    // getSession обновит внутреннее состояние authClient, 
    // и переменная session (сверху) обновится реактивно
    await authClient.getSession({
        fetchOptions: {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }
    });
  } catch (e) {
    console.error("Ошибка обновления:", e);
  } finally {
    isRefetching.value = false;
  }
};

// Функция выхода
const handleSignOut = async () => {
  await authClient.signOut();
  refreshSession(); 
};
</script>