import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import type { ApiError } from '../types/models'

const baseURL = import.meta.env.VITE_API_URL || '/api'

const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors and response formatting
http.interceptors.response.use(
  (response) => {
    // Extract data from response wrapper if it exists
    return response.data?.data || response.data
  },
  (error: AxiosError<ApiError>) => {
    const router = useRouter()
    const auth = useAuthStore()

    // Handle authentication errors
    if (error.response?.status === 401) {
      auth.logout()
      router.push('/login')
    }

    // Handle authorization errors
    if (error.response?.status === 403) {
      router.push('/unauthorized')
    }

    // Format error response
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors || {},
      status: error.response?.status || 500
    }

    return Promise.reject(apiError)
  }
)

export default http

// Type-safe API request methods
const api = {
  async get<T>(url: string, params?: Record<string, any>) {
    return http.get<T>(url, { params })
  },

  async post<T>(url: string, data?: any) {
    return http.post<T>(url, data)
  },

  async put<T>(url: string, data: any) {
    return http.put<T>(url, data)
  },

  async patch<T>(url: string, data: any) {
    return http.patch<T>(url, data)
  },

  async delete<T>(url: string) {
    return http.delete<T>(url)
  }
}

export const { get, post, put, patch, delete: del } = api