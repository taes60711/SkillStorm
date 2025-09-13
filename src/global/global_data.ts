import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import PostService from "@/services/post_service";
import SkillService from "@/services/skill_service";
import { APIHttpController, DevType } from "./api_http_controller";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import Loading from "@/components/utilities/Loading.vue";
import CourseService from "@/services/course_service";
import { userDataStore } from "./user_data";

export class GlobalData {
  private static instance: GlobalData;

  private constructor() {}

  static postBoard: PostBoard[] = [];

  static skillData: SkillData[] = [];

  static modalController = new ModalController();

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

  /// 未完成
  static async getExtendsPost(postId: string) {
    const id: number = parseInt(postId);

    new PostService().getPostByPostId(id);
  }

  /// 未完成
  static async getExtendsCourse(courseId: string) {
    const id: number = parseInt(courseId);
    new CourseService().getCoursByCourseId(
      id,
      userDataStore.userData.value.uid
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
