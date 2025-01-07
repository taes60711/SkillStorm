import { ref, type Ref } from 'vue'
import { 
  AuthService, 
  type User, 
  type UserCredentials, 
  type RegisterData,
  type GoogleSignInData 
} from '../services/AuthService'

const authService = new AuthService()
const currentUser: Ref<User | null> = ref(null)
const loading: Ref<boolean> = ref(false)
const error: Ref<string | null> = ref(null)

interface UseAuthReturn {
  currentUser: Ref<User | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  login: (credentials: UserCredentials) => Promise<boolean>
  googleSignIn: (userData: GoogleSignInData) => Promise<boolean>
  sendVerificationCode: (email: string, type: 'signUp' | 'resetPwd') => Promise<boolean>
  register: (userData: RegisterData, captchaCode: string) => Promise<boolean>
  resetPassword: (email: string, newPassword: string, captchaCode: string) => Promise<boolean>
  logout: () => void
}

export function useAuth(): UseAuthReturn {
  const login = async (credentials: UserCredentials) => {
    loading.value = true
    error.value = null
    try {
      currentUser.value = await authService.login(credentials)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登入失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  const googleSignIn = async (userData: GoogleSignInData) => {
    loading.value = true
    error.value = null
    try {
      currentUser.value = await authService.googleSignIn(userData)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Google 登入失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  const sendVerificationCode = async (email: string, type: 'signUp' | 'resetPwd') => {
    loading.value = true
    error.value = null
    try {
      const result = await authService.sendVerificationCode(email, type)
      return result === 'success'
    } catch (err) {
      error.value = err instanceof Error ? err.message : '發送驗證碼失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterData, captchaCode: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await authService.register(userData, captchaCode)
      return result === 'success'
    } catch (err) {
      error.value = err instanceof Error ? err.message : '註冊失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string, newPassword: string, captchaCode: string) => {
    loading.value = true
    error.value = null
    try {
      const result = await authService.resetPassword(email, newPassword, captchaCode)
      return result === 'success'
    } catch (err) {
      error.value = err instanceof Error ? err.message : '重設密碼失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    currentUser.value = null
  }

  return {
    currentUser,
    loading,
    error,
    login,
    googleSignIn,
    sendVerificationCode,
    register,
    resetPassword,
    logout
  }
}
