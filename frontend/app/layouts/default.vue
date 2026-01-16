<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Шапка -->
    <AppHeader />

    <!-- Основной контент (растягивается) -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Подвал -->
    <AppFooter />
  </div>
</template>