export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/login",
      GOOGLE_SIGN_IN: "/googleSignUpUser",
      SIGN_UP: "/signUp",
      UPDATE_PASSWORD: "/updateUserPwdByEmail",
      UPDATE_LOGIN_TIME: "/updateLoginTime",
      UPDATE: "/update",
    },
    EMAIL: {
      SEND_CAPTCHA: "/sendCaptchaMail",
    },
    SKILL: {
      GET_ALL_SKILL: "/getList",
    },
    POST: {
      GET_ALL_POST_BOARD: "/getAllPostBoard",
      CREATE_POST: "/createPost",
      GET_ALL: "/getAll",
    },
    COURSE: {
      CREATE_COURSE: "/createCourse",
      GET_ALL: "/getAllCourses",
    },
  },
};
