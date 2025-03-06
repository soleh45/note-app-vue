import type { AxiosResponse } from 'axios'

export interface TodosTypesResponse extends AxiosResponse {
  data: Todos[]
}

export type Todos = {
  userId: number
  id: number
  title: string
  body: string
}

export type TodosParams = {
  userId: number
  title: string
  body: string
}
