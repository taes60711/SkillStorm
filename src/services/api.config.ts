/// api用的ip & port
export const ip: string = import.meta.env.VITE_API_HOST || "localhost"
export const port: string = import.meta.env.VITE_API_PORT || "80"

export const API_CONFIG = {
  BASE_URL: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/user/login',
      GOOGLE_SIGN_IN: '/user/google-sign-in',
      SIGN_UP: '/user/sign-up',
      UPDATE_PASSWORD: '/user/update-password',
      UPDATE_LOGIN_TIME: '/user/update-login-time',
      UPDATE: '/user/update',
      UPDATE_TOKEN: '/user/update-token',
      SEND_CAPTCHA: '/user/send-captcha'
    },
    EMAIL: {
      SEND_CAPTCHA: '/email/send-captcha'
    },
    SKILL: {
      GET_ALL_SKILL: '/skill/get-all'
    }
  }
}



