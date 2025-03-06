import { defineStore } from 'pinia'
import { STORES_KEY } from './storeskey'
import type { TodosTypesResponse } from '@/types/todos'

export const todosInitialState: Array<TodosTypesResponse['data']['0']> = []

export const useTodosStore = defineStore(STORES_KEY.TODOS, {
  state: () => {
    return {
      todos: todosInitialState,
      isFetching: false,
    }
  },

  actions: {
    setAllTodos(payload: TodosTypesResponse['data']) {
      this.todos = payload.sort((a, b) => b.id - a.id)
    },
    addNewTodos(payload: TodosTypesResponse['data'][0]) {
      const result = [...this.todos, payload]
      this.todos = result.sort((a, b) => b.id - a.id)
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((e) => e.id !== id)
    },
    updateTodo(payload: TodosTypesResponse['data'][0]) {
      const idx = this.todos.findIndex((e) => e.id === payload.id)
      const tempTodos = [...this.todos]
      tempTodos[idx] = payload
      this.todos = tempTodos
    },
    globalLoading() {
      this.isFetching = !this.isFetching
    },
  },

  getters: {
    getAllTodos: (state) => state.todos,
    getTodoById: (state) => (id: number) => {
      return state.todos.find((todo) => todo.id === id)
    },
    getGlobalLoadingState: (state) => state.isFetching,
  },
})
