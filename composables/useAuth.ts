import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthResponse {
  user: User
  token?: string
}

interface AuthMeResponse {
  user: User
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = () => {
  const authState = useState<AuthState>('auth', () => ({
    user: null,
    isAuthenticated: false,
    isLoading: true
  }))

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<AuthResponse>(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        body: { email, password }
      })

      authState.value.user = response.user
      authState.value.isAuthenticated = true
      authState.value.isLoading = false

      return { success: true, user: response.user }
    } catch (error: any) {
      authState.value.user = null
      authState.value.isAuthenticated = false
      authState.value.isLoading = false

      return { 
        success: false, 
        error: error.data?.message || error.message || 'Login failed' 
      }
    }
  }

  const logout = async () => {
    try {
      await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
        method: 'POST'
      })

      authState.value.user = null
      authState.value.isAuthenticated = false
      authState.value.isLoading = false

      await navigateTo('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const checkAuth = async () => {
    if (import.meta.server) return

    try {
      const response = await $fetch<AuthMeResponse>(buildApiUrl(API_ENDPOINTS.AUTH.ME))

      if (response?.user) {
        authState.value.user = response.user
        authState.value.isAuthenticated = true
        console.log('Auth check successful:', response.user.email)
      } else {
        authState.value.user = null
        authState.value.isAuthenticated = false
        console.log('Auth check: no user found')
      }
    } catch (error) {
      authState.value.user = null
      authState.value.isAuthenticated = false
      console.log('Auth check error:', error)
    } finally {
      authState.value.isLoading = false
    }
  }

  const setupAdmin = async (email: string, password: string, name?: string) => {
    try {
      const response = await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.SETUP), {
        method: 'POST',
        body: { email, password, name }
      })

      return { success: true, data: response }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Setup failed' 
      }
    }
  }

  return {
    user: readonly(computed(() => authState.value.user)),
    isAuthenticated: readonly(computed(() => authState.value.isAuthenticated)),
    isLoading: readonly(computed(() => authState.value.isLoading)),
    login,
    logout,
    checkAuth,
    setupAdmin
  }
}