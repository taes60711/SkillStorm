import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import PostService from "@/services/post_service";
import SkillService from "@/services/skill_service";
import { APIHttpController, DevType } from "./api_http_controller";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import Loading from "@/components/utilities/Loading.vue";
import CourseService from "@/services/course_service";
import { userDataStore } from "./user_data";
import { ref } from "vue";
import type { Ref } from "@vue/runtime-core";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import PostDetail from "@/components/post/PostDetail.vue";
import CourseDetail from "@/components/course/CourseDetail.vue";
import type { Course } from "@/models/reponse/course/course_reponse_data";

export class GlobalData {
  private static instance: GlobalData;

  private constructor() {}

  static postBoard: PostBoard[] = [];

  static skillData: SkillData[] = [];

  static modalController = new ModalController();

  static nowPath: Ref<string> = ref<string>("");

  public static async init(): Promise<GlobalData> {
    if (!GlobalData.instance) {
      GlobalData.instance = new GlobalData();
    }
    APIHttpController.getInstance().init(DevType.debug);

    await this.getPostBoardData();
    await this.getSkillData();

    return GlobalData.instance;
  }

  private static async getPostBoardData() {
    this.postBoard = await new PostService().getAllPostBoard();
  }

  private static async getSkillData() {
    this.skillData = await new SkillService().getSkillList();
  }

  static async getExtendsPost(postId: string) {
    GlobalData.openLoadingModal();
    const id: number = parseInt(postId);

    const postData: Post | String = await new PostService().getPostByPostId(id);
    GlobalData.closeLoadingModal();
    if (typeof postData === "string") {
      return;
    }

    this.modalController.show(
      PostDetail,
      { postData: postData },
      true,
      true,
      "rgba(0, 0, 0, 0.4)",
      "postDetail"
    );
  }

  static async getExtendsCourse(courseId: string) {
    GlobalData.openLoadingModal();
    const id: number = parseInt(courseId);
    const corseData: Course | String =
      await new CourseService().getCoursByCourseId(
        id,
        userDataStore.userData.value.uid
      );
    GlobalData.closeLoadingModal();
    if (typeof corseData === "string") {
      return;
    }

    this.modalController.show(
      CourseDetail,
      { courseData: corseData },
      true,
      true,
      "rgba(0, 0, 0, 0.4)",
      "CourseDetail"
    );
  }

  static openLoadingModal() {
    this.modalController.show(
      Loading,
      {},
      false,
      false,
      "rgba(0, 0, 0, 0.4)",
      "loading"
    );
  }

  static closeLoadingModal() {
    this.modalController.close();
  }
}
