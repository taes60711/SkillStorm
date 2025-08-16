import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import PostService from "@/services/post_service";
import SkillService from "@/services/skill_service";
import { APIHttpController, DevType } from "./api_http_controller";

export class GlobalData {
  private static instance: GlobalData;

  private constructor() {}

  static postBoard: PostBoard[] = [];

  static skillData: SkillData[] = [];

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
}
