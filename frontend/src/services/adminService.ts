import { api } from '@/services/api'
import type { ApiResponse } from '@/types/api'
import type { Product } from '@/types/product'

export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled'

export type AdminOrderItem = {
  productId: string
  name: string
  quantity: number
  price: number
}

export type AdminOrder = {
  id: string
  customerName: string
  customerEmail: string
  status: OrderStatus
  total: number
  date: string
  deliveryDate: string
  paymentMethod: string
  shippingAddress: string
  items: AdminOrderItem[]
}

export type AdminCustomer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orders: number
  lifetimeValue: number
  lastOrder: string
  recentOrders: string[]
  blocked: boolean
}

export type ContactMessageInput = {
  name: string
  email: string
  phone: string
  message: string
}

export const adminService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<ApiResponse<Product[]>>('/products?limit=200')
    return data.data
  },

  async getOrders(): Promise<AdminOrder[]> {
    const { data } = await api.get<ApiResponse<AdminOrder[]>>('/admin/orders')
    return data.data
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<AdminOrder | null> {
    const { data } = await api.patch<ApiResponse<AdminOrder>>(`/admin/orders/${orderId}/status`, {
      status,
    })
    return data.data
  },

  async extendDeliveryTime(orderId: string): Promise<AdminOrder | null> {
    const { data } = await api.post<ApiResponse<AdminOrder>>(`/admin/orders/${orderId}/extend-delivery`)
    return data.data
  },

  async cancelOrder(orderId: string): Promise<AdminOrder | null> {
    const { data } = await api.post<ApiResponse<AdminOrder>>(`/admin/orders/${orderId}/cancel`)
    return data.data
  },

  async getCustomers(): Promise<AdminCustomer[]> {
    const { data } = await api.get<ApiResponse<AdminCustomer[]>>('/admin/customers')
    return data.data
  },

  async toggleCustomerBlock(customerId: string): Promise<AdminCustomer | null> {
    const { data } = await api.patch<ApiResponse<AdminCustomer>>(
      `/admin/customers/${customerId}/toggle-block`,
    )
    return data.data
  },

  async sendContactMessage(payload: ContactMessageInput): Promise<boolean> {
    const { data } = await api.post<ApiResponse<{ id: string }>>('/contact-messages', payload)
    return data.success
  },
}