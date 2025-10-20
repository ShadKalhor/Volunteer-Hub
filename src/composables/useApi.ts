import { ref, computed, type Ref } from 'vue'
import { get, post, put, del } from '@/lib/http'
import type { ApiError } from '@/types/models'
import { useToast } from './useToast'

export interface UseApiOptions {
  immediate?: boolean
  showError?: boolean
  onError?: (error: ApiError) => void
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  const toast = useToast()

  const hasError = computed(() => error.value !== null)

  async function execute(params?: Record<string, any>): Promise<T | null> {
    loading.value = true
    error.value = null

    try {
      const response = await get<T>(url, params)
      data.value = response
      return response
    } catch (err) {
      error.value = err as ApiError
      if (options.showError) {
        toast.error(error.value.message)
      }
      if (options.onError) {
        options.onError(error.value)
      }
      return null
    } finally {
      loading.value = false
    }
  }

  async function create<D>(payload: D): Promise<T | null> {
    loading.value = true
    error.value = null

    try {
      const response = await post<T>(url, payload)
      data.value = response
      return response
    } catch (err) {
      error.value = err as ApiError
      if (options.showError) {
        toast.error(error.value.message)
      }
      return null
    } finally {
      loading.value = false
    }
  }

  async function update<D>(id: string, payload: D): Promise<T | null> {
    loading.value = true
    error.value = null

    try {
      const response = await put<T>(`${url}/${id}`, payload)
      data.value = response
      return response
    } catch (err) {
      error.value = err as ApiError
      if (options.showError) {
        toast.error(error.value.message)
      }
      return null
    } finally {
      loading.value = false
    }
  }

  async function remove(id: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      await del(`${url}/${id}`)
      data.value = null
      return true
    } catch (err) {
      error.value = err as ApiError
      if (options.showError) {
        toast.error(error.value.message)
      }
      return false
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    hasError,
    execute,
    create,
    update,
    remove
  }
}