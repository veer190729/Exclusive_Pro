import { CATEGORIES } from '@/constants/categories'
import { api } from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { Category } from '@/types/category'

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const { data } = await api.get<ApiResponse<Category[]>>('/categories')
      return data.data
    } catch {
      return CATEGORIES
    }
  },
}
