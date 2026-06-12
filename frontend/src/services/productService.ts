import { api } from '@/services/api'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import type { Product } from '@/types/product'

export const productService = {
  async getFlashSaleProducts(): Promise<Product[]> {
    try {
      const { data } = await api.get<ApiResponse<Product[]>>('/products/flash-sale')
      return data.data
    } catch {
      return []
    }
  },

  async getAllProducts(
    page = 1,
    limit = 12,
    section?: string,
    category?: string,
    search?: string,
  ): Promise<PaginatedResponse<Product>> {
    try {
      const { data } = await api.get<PaginatedResponse<Product>>('/products', {
        params: { page, limit, section, category, search },
      })
      return data
    } catch {
      return {
        success: true,
        data: [],
        total: 0,
        page,
        limit,
      }
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`)
      return data.data
    } catch {
      return null
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const { data } = await api.post<ApiResponse<Product>>('/products', product)
    if (!data.success || !data.data) {
      throw new Error(data.message ?? 'Failed to create product')
    }
    return data.data
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const { data } = await api.put<ApiResponse<Product>>(`/products/${id}`, product)
    if (!data.success || !data.data) {
      throw new Error(data.message ?? 'Failed to update product')
    }
    return data.data
  },

  async deleteProduct(id: string): Promise<void> {
    const { data } = await api.delete<ApiResponse<{ message: string }>>(`/products/${id}`)
    if (!data.success) {
      throw new Error(data.message ?? 'Failed to delete product')
    }
  },
}
