import { APIHttpController } from "@/global/api_http_controller";
import { API_CONFIG } from "./api.config";
import APIClient from "./api_client";
import { userDataStore } from "@/global/user_data";
import type { CreateCourseRequestData } from "@/models/request/course/create_course_request_data";
import type { Course } from "@/models/reponse/course/course_reponse_data";

///  課程相關API
export default class CourseService extends APIClient {
  constructor() {
    super(
      `${APIHttpController.prefixUrl}://${APIHttpController.domainUrl}/courses`
    );
  }

  /**
   * MARK: 創建課程
   */
  async createCourse(courseData: CreateCourseRequestData): Promise<void> {
    const body = {
      createdBy: userDataStore.userData.value?.uid, // 創文章者
      title: courseData.title, // 標題
      needLevel: courseData.needLevel,
      content: courseData.outline, // 大綱
      beforeNeed: courseData.beforeNeed, // 前置
      prStory: courseData.prStory, // 詳細內容
      courseChapters: courseData.courseChapters, // 章節
      learningkillList: courseData.learningkillList, // 學習的技能
      type: courseData.type, // 類別的id（前端, 後端, 雲端...）
      isPublic: courseData.isPublic // 是否公開
    };

    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.COURSE.CREATE_COURSE}`,
      body
    );

    console.log(`createCourse : ${reponseData}`);
  }

  /**
   * MARK: 更新課程
   */
  async updateCourse(
    courseData: CreateCourseRequestData,
    courseId: number
  ): Promise<void> {
    const body = {
      createdBy: userDataStore.userData.value?.uid, // 創文章者
      title: courseData.title, // 標題
      needLevel: courseData.needLevel,
      content: courseData.outline, // 大綱
      beforeNeed: courseData.beforeNeed, // 前置
      prStory: courseData.prStory, // 詳細內容
      courseChapters: courseData.courseChapters, // 章節
      learningkillList: courseData.learningkillList, // 學習的技能
      type: courseData.type, // 類別的id（前端, 後端, 雲端...）
      isPublic: courseData.isPublic // 是否公開
    };

    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.COURSE.UPDATE_COURSE}/${courseId}`,
      body
    );

    console.log(`updateCourse : ${reponseData}`);
  }

  /**
   * 所有課程
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getAllCourse(
    page: number,
    size: number,
    userId: string
  ): Promise<Course[]> {
    const param = {
      page: page,
      size: size
    };

    const reponseData: Course[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.COURSE.GET_ALL}/${userId}`,
      param
    );

    console.log(reponseData);

    if (typeof reponseData === "string") {
      return [];
    } else {
      return reponseData;
    }
  }

  /**
   * 自己創建的所有課程
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getMyCreateCourse(
    page: number,
    size: number,
    userId: string
  ): Promise<Course[]> {
    const param = {
      page: page,
      size: size
    };

    const reponseData: Course[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.COURSE.GET_MY_COURSE}/${userId}`,
      param
    );

    console.log(reponseData);

    if (typeof reponseData === "string") {
      return [];
    } else {
      return reponseData;
    }
  }

  /**
   * 自己加入的所有課程
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getMyAddedCourse(
    page: number,
    size: number,
    userId: string
  ): Promise<Course[]> {
    const param = {
      page: page,
      size: size
    };

    const reponseData: Course[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.COURSE.GET_ADDED_COURSE}/${userId}`,
      param
    );

    console.log(reponseData);

    if (typeof reponseData === "string") {
      return [];
    } else {
      return reponseData;
    }
  }
}
