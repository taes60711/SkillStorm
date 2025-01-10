// 根據環境變量設置基礎URL
const getBaseUrl = () => {
  // 如果定義了環境變量，則使用環境變量
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  // 默認使用本地開發環境
  return 'http://localhost:8080'
}

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/user/login',
      GOOGLE_SIGN_IN: '/user/googleSignUpUser',
      SIGN_UP: '/user/signUp',
      SEND_CAPTCHA: '/user/sendCaptchaMail',
      UPDATE_PASSWORD: '/user/updateUserPwdByEmail',
      UPDATE_LOGIN_TIME: '/user/updateLoginTime',
      UPDATE_TOKEN: '/user/updateToken'
    }
  }
} 