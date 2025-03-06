<template>
  <button
    @click="onclick"
    class="w-full bg-[var(--tosca)] px-4 py-2 rounded-sm text-white text-sm font-semiBold"
  >
    Buat Catatan
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['onclick'])

function onclick() {
  emit('onclick')
}
</script>

<style></style>
