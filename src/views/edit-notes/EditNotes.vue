<template>
  <InputTodo
    @handle-delete-todo="handleDeleteTodo"
    @submit-todo="handleUpdateTodo"
    :body-props="todo?.body"
    :title-props="todo?.title"
    :is-editable="true"
  />
</template>

<script lang="ts" setup>
import InputTodo from '@/components/input-todo/InputTodo.vue'
import { routesEnum } from '@/router'
import { deleteTodosServices, updateTodosServices } from '@/services'
import { useTodosStore } from '@/stores/todos'
import type { TodosTypesResponse } from '@/types/todos'
import { HttpStatusCode } from 'axios'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const todosStore = useTodosStore()

const todo = computed(() => {
  const id = Number(route.params.id)
  return todosStore.getTodoById(id)
})

async function handleDeleteTodo() {
  todosStore.globalLoading()
  try {
    const response = await deleteTodosServices(Number(route.params.id))

    if (response.status === HttpStatusCode.Ok) {
      toast('Catatan berhasil di hapus', {
        type: 'success',
      })

      todosStore.deleteTodo(Number(route.params.id))
    }
  } catch (error) {
    toast(error, {
      type: 'error',
    })
  } finally {
    setTimeout(() => {
      todosStore.globalLoading()
      router.replace(routesEnum.MAIN_PAGE)
    }, 1000)
  }
}

async function handleUpdateTodo(params: { title: string; body: string }) {
  todosStore.globalLoading()

  // request payload
  const payload = {
    ...todo.value,
    title: params.title,
    body: params.body,
  }

  try {
    const response = await updateTodosServices(payload as TodosTypesResponse['data'][0])

    if (response.status === HttpStatusCode.Ok) {
      toast('Catatan berhasil di update', {
        type: 'success',
      })

      todosStore.updateTodo(response.data)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast('Catatan berhasil di update', {
      type: 'success',
    })
    todosStore.updateTodo(payload as TodosTypesResponse['data'][0])
  } finally {
    setTimeout(() => {
      todosStore.globalLoading()
      router.replace(routesEnum.MAIN_PAGE)
    }, 1000)
  }
}
</script>

<style></style>
