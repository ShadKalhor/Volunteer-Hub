import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  email: string
  name: string
}

interface LoginPayload {
  email: string
  password?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (payload: LoginPayload) => {
    loading.value = true
    error.value = null
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      user.value = {
        id: '1',
        email: payload.email,
        name: payload.email.split('@')[0]
      }

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to login'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // Initialize from localStorage
  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  // Call initAuth when store is created
  initAuth()

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: () => !!user.value
  }
})