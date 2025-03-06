<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AppBase from './components/layouts/base/AppBase.vue'
import { useGetTodosServices } from './services'
import { useTodosStore } from './stores/todos'
import 'vue3-toastify/dist/index.css'

const todosStore = useTodosStore()

const isFetching = computed(() => todosStore.getGlobalLoadingState)

async function getAllTodos() {
  try {
    const response = await useGetTodosServices()

    if (response.data) {
      todosStore.setAllTodos(response.data)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(getAllTodos)
</script>

<template>
  <div
    v-if="isFetching"
    class="absolute h-full w-screen bg-[#253053] z-100 opacity-50 flex items-center justify-center"
  >
    <span class="text-white">Mohon tunggu...</span>
  </div>
  <AppBase />
</template>
