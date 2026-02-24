import type { GetQueriesResponse, SingleQueryResponse } from "@/types/query"

import { api } from "../axios"
import type { QueryStatus } from "@/enum/query-enum"

export async function getAllQueries(
  page: number = 1,
  limit: number = 10,
  status?: QueryStatus
): Promise<GetQueriesResponse> {
  try {
    const response = await api.get<GetQueriesResponse>('/queries', {
      params: {
        page,
        limit,
        status,
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch queries')
    } else {
      throw new Error(error.message || 'Failed to fetch queries')
    }
  }
}


export async function updateQueryStatus(
  id: string,
  status: QueryStatus
): Promise<SingleQueryResponse> {
  try {
    const response = await api.patch<SingleQueryResponse>(
      `/queries/${id}/status`,
      { status }
    )

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update status')
    } else {
      throw new Error(error.message || 'Failed to update status')
    }
  }
}

export async function getQueryCount(
  // status?: QueryStatus
): Promise<{ success: boolean; count: number }> {
  try {
    const response = await api.get('/queries/count/new')

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to get count')
    } else {
      throw new Error(error.message || 'Failed to get count')
    }
  }
}
