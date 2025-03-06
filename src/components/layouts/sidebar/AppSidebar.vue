<template>
  <div
    class="w-fit lg:max-w-[370px] lg:min-w-[370px] max-md:max-w-[240px] max-md:min-w-[240px] bg-white min-h-screen border-r border-gray-100 p-[24px]"
  >
    <SearchComponent
      class="mb-5 max-md:w-[150px]"
      v-model:search="fuzzySearchField"
      @on-click-button-add="addNotes"
    />

    <div class="mt-2 mb-5">
      <span class="text-lg font-bold">Hari ini</span>
    </div>

    <CardListTodos
      class="pt-2"
      :todos-list="todosList"
      :edit-params-id="Number(editParamsId)"
      @edit-notes="editNotes"
      :fuzzy-search-field="fuzzySearchField"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { routesEnum } from '@/router'
import { useTodosStore } from '@/stores/todos'
import { computed, ref } from 'vue'
import CardListTodos from '@/components/card-list/CardListTodos.vue'
import SearchComponent from '@/components/search/SearchComponent.vue'

const todosStore = useTodosStore()
const todosList = computed(() => todosStore.getAllTodos)
const router = useRouter()
const route = useRoute()
const fuzzySearchField = ref('')

const editParamsId = computed(() => route.params.id)

function addNotes() {
  router.push(routesEnum.ADD_NOTES_PAGE)
}

function editNotes(id: number) {
  router.push({ name: 'editNotes', params: { id } })
}
</script>

<style></style>
