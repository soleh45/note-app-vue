<template>
  <div class="max-[600px]:hidden bg-white flex flex-col h-full w-full rounded-lg p-[24px]">
    <div
      class="flex flex-row h-fit p-5 w-full justify-between border-b border-[var(--gray-border-239)]"
    >
      <input
        v-model="title"
        placeholder="Tulis Judul catatanmu"
        class="w-full focus:outline-none text-2xl font-bold"
      />

      <button
        @click="onSubmitTodo"
        class="h-[56px] w-[56px] absolute bottom-10 right-13 self-end bg-[var(--tosca)] rounded-full flex items-center justify-center"
      >
        <img height="20" width="20" alt="save" src="@/assets/save-icon-white.svg" />
      </button>

      <div class="flex flex-row gap-5">
        <button @click="handleDeleteTodo" :hidden="isEditable === false">
          <img height="20" width="20" alt="trash" src="@/assets/trash.svg" />
        </button>
      </div>
    </div>
    <div class="flex h-fit p-5 w-full items-start">
      <textarea
        v-model="body"
        placeholder="Tulis catatanmu disini"
        class="focus:outline-none w-full h-[200px] font-normal text-[var(--gray-body-text)]"
        type="text"
      />
    </div>
  </div>

  <div class="min-[600px]:hidden">
    <div class="flex flex-row items-center justify-between h-[50px] mb-4">
      <button @click="handleBackAction">
        <img alt="back-icon" src="@/assets/back-icon.svg" class="w-[24px] h-[24px]" />
      </button>

      <button @click="onSubmitTodo">
        <img alt="back-icon" src="@/assets/save-icon.svg" class="w-[24px] h-[24px]" />
      </button>
    </div>

    <div class="h-screen">
      <div class="">
        <textarea
          v-model="title"
          placeholder="Tulis Judul catatanmu"
          class="w-full focus:outline-none text-2xl font-semiBold resize-none"
          @input="resizeTextarea"
          ref="textarea"
        />
      </div>
      <div class="flex h-fit w-full items-start">
        <textarea
          v-model="body"
          placeholder="Tulis catatanmu disini"
          class="focus:outline-none w-full h-[200px] font-normal text-[var(--gray-body-text)]"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const props = defineProps<{
  titleProps?: string
  bodyProps?: string
  isEditable?: boolean
}>()

const router = useRouter()
const title = ref('')
const body = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)

const emit = defineEmits(['submit-todo', 'handle-delete-todo'])

watchEffect(() => {
  if (props.titleProps && props.bodyProps) {
    title.value = props.titleProps
    body.value = props.bodyProps
  }
})

function onSubmitTodo() {
  if (title.value.length === 0 || body.value.length === 0) {
    return toast('Judul dan catatan tidak boleh kosong', {
      type: 'error',
    })
  }

  const emitData = {
    title: title.value,
    body: body.value,
  }
  emit('submit-todo', emitData)
  title.value = ''
  body.value = ''
}

function handleDeleteTodo() {
  if (title.value.length === 0 || body.value.length === 0) {
    return toast('Judul dan catatan tidak boleh kosong', {
      type: 'error',
    })
  }
  emit('handle-delete-todo', undefined)
}

function handleBackAction() {
  router.back()
}

const resizeTextarea = () => {
  if (textarea.value) {
    textarea.value.style.height = '40px'
    textarea.value.style.height = textarea.value.scrollHeight + 'px'
  }
}

onMounted(resizeTextarea)
</script>
