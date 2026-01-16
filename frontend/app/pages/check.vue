<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

// Используем ref для хранения данных
const session = ref(null);
const loading = ref(true);

onMounted(async () => {
    // Этот код выполнится ТОЛЬКО в браузере
    try {
        const { data } = await authClient.getSession({
            fetchOptions: {
                headers: { 'Cache-Control': 'no-cache' }
            }
        });
        session.value = data;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl font-bold mb-5">Проверка сессии (Client Side)</h1>

        <div v-if="loading" class="text-blue-500">
            Загрузка данных из браузера...
        </div>

        <div v-else-if="session" class="p-4 bg-green-100 border border-green-400 rounded">
            <h2 class="font-bold text-green-700">УСПЕХ! Вы авторизованы.</h2>
            <pre class="mt-2 text-sm">{{ session }}</pre>
        </div>

        <div v-else class="p-4 bg-red-100 border border-red-400 rounded">
            <h2 class="font-bold text-red-700">ВЫ НЕ АВТОРИЗОВАНЫ</h2>
            <p>Браузер получил null от API.</p>
        </div>
    </div>
</template>