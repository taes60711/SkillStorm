export const API_CONFIG = {
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/login",
      GOOGLE_SIGN_IN: "/webGoogleSignUpUser",
      SIGN_UP: "/signUp",
      UPDATE_PASSWORD: "/updateUserPwdByEmail",
      UPDATE_LOGIN_TIME: "/updateLoginTime",
      UPDATE: "/update"
    },
    EMAIL: {
      SEND_CAPTCHA: "/sendCaptchaMail"
    },
    SKILL: {
      GET_ALL_SKILL: "/getList"
    },
    POST: {
      GET_ALL_POST_BOARD: "/getAllPostBoard",
      GET_POST_COMMENT: "/getPostComment",
      CREATE_POST: "/createPost",
      UPDATE_POST: "/update",
      CREATE_POST_COMMENT: "/createPostComment",
      DELETE_POST_COMMENT: "/deletePostComment",
      UPDATE_POST_COMMENT: "/updatePostComment",
      GET_ALL: "/getAll",
      GET_NEW: "/getNewPosts",
      GET_TYPE: "/getPostsByType",
      GET_MY_POST: "/getPostsByUser"
    },
    COURSE: {
      CREATE_COURSE: "/createCourse",
      UPDATE_COURSE: "/updateCourse",
      GET_MY_COURSE: "/getCoursesByUserId",
      GET_ADDED_COURSE: "/getAddedCourses",
      GET_ALL: "/getAllCourses"
    }
  }
};
