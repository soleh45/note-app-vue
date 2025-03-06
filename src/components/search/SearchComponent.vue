<template>
  <!-- search comp -->
  <div class="flex flex-row items-center gap-2 justify-between w-full">
    <div
      class="flex flex-row items-center justify-between gap-2 border border-[var(--gray-border-202)] px-4 py-2 rounded-md w-full"
    >
      <div class="flex flex-row items-center gap-2">
        <img alt="search" src="@/assets/search.svg" />
        <input
          v-model="search"
          placeholder="Cari notes anda"
          class="focus:outline-none max-md:text-sm"
        />
      </div>

      <button @click="clearAllText" v-if="search?.length && search?.length > 0 && showButtonClear">
        <img alt="x-icon" src="@/assets/x-icon.svg" />
      </button>
    </div>

    <!-- add button notes -->
    <button v-if="!hideButtonAdd" @click="onClickButtonAdd" class="min-w-[40px] min-h-[40px]">
      <img width="50" height="50" alt="plus-icon" src="@/assets/plus-icon.svg" />
    </button>
  </div>
  <!-- search comp -->
</template>

<script lang="ts" setup>
import { defineModel, defineEmits, defineProps } from 'vue'

defineProps<{
  hideButtonAdd?: boolean
  showButtonClear?: boolean
}>()

const search = defineModel<string>('search')
const emit = defineEmits(['on-click-button-add', 'clear-all-text'])

function onClickButtonAdd() {
  emit('on-click-button-add')
}

function clearAllText() {
  emit('clear-all-text')
}
</script>

<style></style>
