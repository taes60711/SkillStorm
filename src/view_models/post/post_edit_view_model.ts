import type { Ref } from "vue";
import { ref } from "vue";
import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { GlobalData } from "@/global/global_data";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import PostService from "@/services/post_service";
import { EditTools } from "@/global/edit_tools";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import confimModal from "@/components/utilities/Modal/confirmModal.vue";
/// 文章編輯ViewModel
export default class PostEditViewModel {
  editTools: EditTools = new EditTools();

  /// 內文
  mainMessageController: Ref<string> = ref<string>("");

  /// 看板
  selectedBoard: Ref<PostBoard> = ref<PostBoard>(GlobalData.postBoard[0]);

  /// 圖片/影片
  fileMessageController: Ref<string[]> = ref<string[]>([]);

  modalController = new ModalController();

  /**
   * MARK: 送出按鈕
   */
  send = async (): Promise<void> => {
    console.log(
      `selectedBoard: ${this.selectedBoard.value?.chineseName}  mainMessage: ${this.mainMessageController.value} fileMessage: ${this.fileMessageController.value}`
    );

    const postData: CreatePostRequestData = {
      type: this.selectedBoard.value.id,
      content: this.mainMessageController.value,
      fileMessage: this.fileMessageController.value,
    };

    await new PostService().createPost(postData);
    this.resetAllEditData();
    this.modalController.show(confimModal);
  };

  /**
   * 清空所有編輯的資料（暫時）
   */
  private resetAllEditData = (): void => {
    this.selectedBoard.value = GlobalData.postBoard[0];
    this.mainMessageController.value = "";
    this.fileMessageController.value = [];
  };
}
