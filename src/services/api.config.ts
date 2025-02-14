/// api用的ip & port
export const ip: string = import.meta.env.VITE_API_HOST || "localhost"
export const port: string = import.meta.env.VITE_API_PORT || "80"

export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/login',
      GOOGLE_SIGN_IN: '/googleSignUpUser',
      SIGN_UP: '/signUp',
      UPDATE_PASSWORD: '/updateUserPwdByEmail',
      UPDATE_LOGIN_TIME: '/updateLoginTime',
      UPDATE: '/update',
    },
    EMAIL: {
      SEND_CAPTCHA: '/sendCaptchaMail',
    },
    SKILL: {
      GET_ALL_SKILL: '/getList',
    },
    POST: {
      GET_ALL_POST_BOARD: '/getAllPostBoard',
      CREATE_POST: '/createPost',
    },
    COURSE: {
      CREATE_COURSE: '/createCourse',
    }
  }
}



