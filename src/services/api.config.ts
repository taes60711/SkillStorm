export const API_CONFIG = {
  BASE_URL: 'http://localhost:80',
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