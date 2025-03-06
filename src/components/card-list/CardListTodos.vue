<template>
  <div class="max-h-screen hide-scrollbar overflow-y-auto px-1 pb-40">
    <div
      @click="!isSwiped(item.id) && editNotes(item.id)"
      :class="[
        Number(editParamsId) === item.id
          ? 'border border-[var(--tosca-active-border)] bg-[var(--tosca-active-bg)]'
          : 'border border-white bg-white',
        { '-translate-x-16': isSwiped(item.id) },
      ]"
      class="drop-shadow-sm p-4 rounded-md mb-5 transition-transform duration-300 ease-in-out"
      v-for="item in todosList.filter((item) =>
        item.title.toLowerCase().includes(fuzzySearchField),
      )"
      v-bind:key="item.id"
    >
      <button
        @click="handleDeleteTodo(item.id)"
        dir="rtl"
        v-if="isSwiped(item.id)"
        class="drop-shadow-sm flex items-center justify-center bg-[var(--red-chain)] w-[60px] h-full absolute right-[-60px] top-[0px] rounded-s-lg z-[-100]"
      >
        <img alt="trash" src="@/assets/trash-white.svg" class="white" />
      </button>

      <div @touchstart="startSwipe($event, item.id)" @touchmove="moveSwipe($event, item.id)">
        <div class="border-b border-[var(--gray-border-239)] min-w-[290] max-w-[332px] mb-2 pb-3">
          <span class="text-base font-semibold line-clamp-2 max-md:text-sm">{{ item.title }}</span>
        </div>
        <div class="max-w-[290px]">
          <span class="line-clamp-2 text-sm font-normal text-[var(--gray-body-text)]">{{
            item.body
          }}</span>

          <span class="line-clamp-2 text-xs font-normal text-[var(--gray-body-text)] mt-4"
            >1 menit yang lalu</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { type Todos } from '@/types/todos'

defineProps<{
  todosList: Array<Todos>
  editParamsId: number
  fuzzySearchField: string
}>()
const emit = defineEmits(['edit-notes', 'delete-notes'])

const swipedId = ref<null | number>(null)
const swiped = ref<{ id: number }[]>([])
const touchStartX = ref<Record<number, number>>({})

function editNotes(params: number) {
  if (params !== Number(swipedId)) {
    emit('edit-notes', params)
  }
}

const isSwiped = (id: number): boolean => {
  return swipedId.value === id
}

const startSwipe = (event: TouchEvent, id: number): void => {
  touchStartX.value[id] = event.touches[0].clientX
}

const moveSwipe = (event: TouchEvent, id: number): void => {
  const currentX = event.touches[0].clientX
  if (touchStartX.value[id] - currentX > 50) {
    swipedId.value = id

    const index = swiped.value.findIndex((item) => item.id === id)
    if (index === -1) {
      swiped.value.push({ id })
    }
  } else {
    swipedId.value = null
  }
}

function handleDeleteTodo(id: number) {
  emit('delete-notes', id)
}
</script>

<style></style>
