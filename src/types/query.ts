import type { QueryStatus } from "@/enum/query-enum"


export interface QueryItem {
  _id: string
  fullName: string
  email: string
  phone: string
  service: string
  message: string
  status: QueryStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateQueryPayload {
  fullName: string
  email: string
  phone: string
  service: string
  message: string
}

export interface GetQueriesResponse {
  success: boolean
  total: number
  page: number
  limit: number
  data: QueryItem[]
}

export interface SingleQueryResponse {
  success: boolean
  message: string
  data: QueryItem
}