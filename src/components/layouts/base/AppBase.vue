<template>
  <main>
    <!-- windows & tablet -->
    <div class="max-[600px]:hidden">
      <HeaderComponent />
      <div class="flex flex-row w-screen h-full">
        <AppSidebar />
        <div class="w-full bg-[var(--base)] p-8"><RouterView /></div>
      </div>
    </div>

    <!-- mobile -->
    <div class="min-[600px]:hidden flex-1 flex-col px-4 py-2 bg-white">
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts" setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import AppSidebar from '../sidebar/AppSidebar.vue'
</script>

<style></style>
