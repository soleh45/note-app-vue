<template>
  <InputTodo @submit-todo="handleSubmitNotes" />
</template>

<script lang="ts" setup>
import { addTodosServices } from '@/services'
import { useTodosStore } from '@/stores/todos'
import type { TodosParams } from '@/types/todos'
import { HttpStatusCode } from 'axios'
import InputTodo from '@/components/input-todo/InputTodo.vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { routesEnum } from '@/router'

const todosStore = useTodosStore()
const router = useRouter()

async function handleSubmitNotes(params: { title: string; body: string }) {
  todosStore.globalLoading()

  const payload: TodosParams = {
    title: params.title,
    body: params.body,
    userId: 1,
  }

  try {
    const response = await addTodosServices(payload)

    if (response.status === HttpStatusCode.Created) {
      const randomNumber = Math.floor(Math.random() * 1000) + 200

      todosStore.addNewTodos({ ...response.data, id: randomNumber })
      toast('Berhasil menambahkan catatan', {
        type: 'success',
      })
    }
  } catch (error) {
    toast(`Internal Server Error: ${error}`, {
      type: 'error',
    })
  } finally {
    setTimeout(() => {
      todosStore.globalLoading()
      router.replace(routesEnum.MAIN_PAGE)
    }, 1000)
  }
}
</script>
