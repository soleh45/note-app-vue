<template>
  <div class="max-[600px]:hidden h-svh max-h-screen hide-scrollbar overflow-y-auto">
    <div class="flex flex-col items-center justify-center h-full">
      <img alt="empty-notes" src="@/assets/empty-notes.svg" />
      <h6 class="text-[var(--black-48)] font-bold">Catatan App</h6>
      <span class="text-sm text-[var(--grey-108)] font-regular mb-4"
        >Buat catatan baru sekarang, yuk!</span
      >
      <div>
        <ButtonGeneric @onclick="handleCreateNewTodo" />
      </div>
    </div>
  </div>

  <div class="min-[600px]:hidden">
    <!-- default header -->
    <div v-if="!visibleSearch" class="flex items-center justify-between h-[50px]">
      <span class="text-lg font-bold">Catatan</span>
      <button @click="handleShowSearch" class="h-[24px] w-[24px]">
        <img class="object-cover h-[20px] w-[20px]" alt="search" src="@/assets/search.svg" />
      </button>
    </div>

    <!-- visible search -->
    <div v-if="visibleSearch" class="flex h-[40px] w-full flex items-center gap-2 mb-3">
      <button @click="handleShowSearch">
        <img alt="back-icon" src="@/assets/back-icon.svg" />
      </button>
      <SearchComponent
        v-model:search="fuzzySearchField"
        :hide-button-add="true"
        class="w-full"
        :show-button-clear="true"
        @clear-all-text="clearAllText"
      />
    </div>

    <div v-if="!isVisibleMain" class="flex flex-col h-screen">
      <div class="mt-2 mb-5">
        <span class="text-lg font-bold">Hari ini</span>
      </div>
      <CardListTodos
        class="pt-2"
        :todos-list="todosList"
        :edit-params-id="Number(editParamsId)"
        @edit-notes="editNotes"
        :fuzzy-search-field="fuzzySearchField"
        @delete-notes="handleDeleteTodo"
      />

      <FloatingButton @on-click-button="addNotes" />
    </div>

    <div v-if="isVisibleMain" class="flex flex-col items-center justify-center h-screen">
      <div class="h-svh max-h-screen hide-scrollbar overflow-y-auto">
        <div class="flex flex-col items-center justify-center h-full">
          <img alt="empty-notes" src="@/assets/empty-notes.svg" />
          <h6 class="text-[var(--black-48)] font-bold">Belum ada catatan</h6>
          <span class="text-sm text-[var(--grey-108)] font-regular mb-4"
            >Buat catatan pertamamu sekarang, yuk</span
          >
          <div>
            <ButtonGeneric @onclick="addNotes" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routesEnum } from '@/router'
import ButtonGeneric from '@/components/generics/button/ButtonGeneric.vue'
import CardListTodos from '@/components/card-list/CardListTodos.vue'
import SearchComponent from '@/components/search/SearchComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useTodosStore } from '@/stores/todos'
import FloatingButton from '@/components/generics/button/FloatingButton.vue'
import { deleteTodosServices } from '@/services'
import { HttpStatusCode } from 'axios'
import { toast } from 'vue3-toastify'

const editParamsId = computed(() => route.params.id)
const todosList = computed(() => store.getAllTodos)
const store = useTodosStore()

const isVisibleMain = computed(() => {
  return store.getAllTodos.length === 0
})

const router = useRouter()
const route = useRoute()
const fuzzySearchField = ref('')

const visibleSearch = ref(false)

function addNotes() {
  router.push(routesEnum.ADD_NOTES_PAGE)
}

function clearAllText() {
  fuzzySearchField.value = ''
}

function handleCreateNewTodo() {
  router.push(routesEnum.ADD_NOTES_PAGE)
}

function editNotes(id: number) {
  router.push({ name: 'editNotes', params: { id } })
}

function handleShowSearch() {
  clearAllText()
  visibleSearch.value = !visibleSearch.value
}

async function handleDeleteTodo(id: number) {
  store.globalLoading()
  try {
    const response = await deleteTodosServices(Number(route.params.id))

    if (response.status === HttpStatusCode.Ok) {
      toast('Catatan berhasil di hapus', {
        type: 'success',
      })

      store.deleteTodo(id)
    }
  } catch (error) {
    toast(error, {
      type: 'error',
    })
  } finally {
    setTimeout(() => {
      store.globalLoading()
    }, 1000)
  }
}
</script>
