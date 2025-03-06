<template>
  <button
    @click="handleOnclikButton"
    class="h-[56px] w-[56px] absolute bottom-10 self-end bg-[var(--tosca)] rounded-full flex items-center justify-center"
  >
    <img alt="plus" src="@/assets/plus-transparent.svg" />
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['on-click-button'])

function handleOnclikButton() {
  emit('on-click-button')
}
</script>

<style></style>
