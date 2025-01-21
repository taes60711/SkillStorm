import { API_CONFIG } from './api.config'

export interface GoogleSignInData {
  email: string
  googlePwd: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface User {
  uid: string
  email: string
  name: string
  token?: string
  image?: string
  job?: string
  introduction?: string
  lastlogin?: string
  isEmailVerified: boolean
  status?: string
  skills?: any[]
  wantSkills?: any[]
  password?: string
}

export interface RegisterData {
  email: string
  name: string
  password: string
  isEmailVerified: boolean
}

/**
 * 認證服務類
 * 負責處理所有與用戶認證相關的業務邏輯
 */
export class AuthService {
  private baseUrl = "http://localhost:8080/user";//API_CONFIG.BASE_URL

  /**
   * 用戶登入
   * @param credentials - 用戶登入憑證
   * @returns Promise<User> - 登入成功後返回用戶信息
   * @throws Error - 登入失敗時拋出錯誤
   */
  async login(credentials: UserCredentials): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}?email=${credentials.email}&password=${credentials.password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('登入失敗')
      }

      const userData = await response.json()
      if (!userData) {
        throw new Error('帳號或密碼錯誤')
      }

      // 更新登入時間
      await this.updateLoginTime(userData.uid, new Date().toISOString())

      return userData
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '登入失敗')
    }
  }

  /**
   * Google 登入
   * @param userData - Google登入數據
   * @returns Promise<User> - 登入成功後返回用戶信息
   * @throws Error - 登入失敗時拋出錯誤
   */
  async googleSignIn(userData: GoogleSignInData): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.GOOGLE_SIGN_IN}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('Google 登入失敗')
      }

      const result = await response.text()
      if (result !== 'success') {
        throw new Error('Google 登入失敗')
      }

      // 登入成功後，使用email和googleId進行一般登入
      return await this.login({
        email: userData.email,
        password: userData.googlePwd
      })
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Google 登入失敗')
    }
  }

  /**
   * 發送驗證碼
   * @param email - 用戶郵箱
   * @param type - 驗證碼類型 (signUp/resetPwd)
   */
  async sendVerificationCode(email: string, type: 'signUp' | 'resetPwd'): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMAIL.SEND_CAPTCHA}?email=${email}&emailType=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('發送驗證碼失敗')
      }

      const result = await response.text()
      if (result === 'emailExist') {
        throw new Error('此信箱已被註冊')
      } else if (result !== 'success') {
        throw new Error('發送驗證碼失敗')
      }

      return result
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '發送驗證碼失敗')
    }
  }

  /**
   * 用戶註冊
   * @param userData - 用戶數據
   * @param captchaCode - 驗證碼
   */
  async register(userData: any, captchaCode: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.SIGN_UP}/${captchaCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('註冊失敗')
      }

      const result = await response.text()
      if (result === 'captchaCodeErr') {
        throw new Error('驗證碼錯誤')
      } else if (result !== 'success') {
        throw new Error('註冊失敗')
      }

      return result
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '註冊失敗')
    }
  }

  /**
   * 重設密碼
   * @param email - 用戶郵箱
   * @param newPassword - 新密碼
   * @param captchaCode - 驗證碼
   */
  async resetPassword(email: string, newPassword: string, captchaCode: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.UPDATE_PASSWORD}/${captchaCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: newPassword
        })
      })

      if (!response.ok) {
        throw new Error('重設密碼失敗')
      }

      const result = await response.text()
      if (result === 'captchaCodeErr') {
        throw new Error('驗證碼錯誤')
      } else if (result !== 'success') {
        throw new Error('重設密碼失敗')
      }

      return result
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '重設密碼失敗')
    }
  }

  /**
   * 更新登入時間
   * @param uid - 用戶ID
   * @param lastlogin - 登入時間
   */
  private async updateLoginTime(uid: string, lastlogin: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.UPDATE_LOGIN_TIME}/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastlogin })
      })
    } catch (error) {
      console.error('更新登入時間失敗:', error)
    }
  }

  /**
   * 更新用戶Token
   * @param uid - 用戶ID
   * @param token - 新的Token
   */
  async updateToken(uid: string, token: string): Promise<void> {
    // try {
    //   await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.UPDATE_TOKEN}/${uid}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ token })
    //   })
    // } catch (error) {
    //   console.error('更新Token失敗:', error)
    // }
  }
}
