import { ENDPOINT } from '@/configs/endpoint'
import httpClient from '@/configs/httpClient'
import type { TodosParams, TodosTypesResponse } from '@/types/todos'

export const useGetTodosServices = async () => {
  try {
    const response: TodosTypesResponse = await httpClient.get(ENDPOINT.TODOS)

    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new error()
  }
}

export const addTodosServices = async (params: TodosParams) => {
  try {
    const response = await httpClient.post(ENDPOINT.TODOS, params)

    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new error()
  }
}

export const deleteTodosServices = async (id: number) => {
  try {
    const response = await httpClient.delete(ENDPOINT.TODOS + '/' + id)

    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new error()
  }
}

export const updateTodosServices = async (params: TodosTypesResponse['data'][0]) => {
  try {
    const response = await httpClient.put(ENDPOINT.TODOS + '/' + params.id, params)

    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new error()
  }
}
