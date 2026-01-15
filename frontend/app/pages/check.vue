<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

// Убираем useFetch, оставляем стандартный клиентский запрос
const session = authClient.useSession(); 
</script>

<template>
    <div class="p-5">
        <!-- Показываем "Загрузка...", пока данные идут -->
        <div v-if="session.isPending" class="text-gray-500">Загрузка...</div>
        
        <pre v-else-if="session.data">{{ session.data }}</pre>
        
        <div v-else>Вы не авторизованы</div>
    </div>
</template>