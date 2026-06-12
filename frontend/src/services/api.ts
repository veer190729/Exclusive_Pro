import axios from 'axios'
import { env } from '@/config/env'

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data ?? error.message)
    return Promise.reject(error)
  },
)

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback

  const message = error.response?.data?.message
  if (typeof message === 'string' && message.trim()) return message

  if (error.response?.status === 413) {
    return 'Product images are too large. Try fewer or smaller images.'
  }

  return fallback
}
