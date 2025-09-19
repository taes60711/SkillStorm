import type { Ref } from "vue";
import { ref } from "vue";
import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import { GlobalData } from "@/global/global_data";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import PostService from "@/services/post_service";
import { EditTools } from "@/global/edit_tools";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import confimModal from "@/components/utilities/Modal/confirmModal.vue";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { userDataStore } from "@/global/user_data";
import { DateFormatUtilities } from "@/global/date_time_format";

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

  postId: number = -1;
  listPostData: Post[] = [];

  needCreatePostAddPage: Boolean = false;

  createEditInit = (listData: Post[]): void => {
    this.listPostData = listData;
    console.log(GlobalData.nowPath.value);
    const segments = GlobalData.nowPath.value.split("/");
    const last = segments[segments.length - 1];

    if (last != "popular") {
      this.needCreatePostAddPage = true;
    }
  };

  editInit = (postData: CreatePostRequestData, listData: Post[]): void => {
    this.selectedBoard.value = postData.type as PostBoard;
    this.mainMessageController.value = postData.content;
    this.fileMessageController.value = [...postData.fileMessage];
    this.postId = postData.postId ?? -1;
    this.listPostData = listData;
  };
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
      fileMessage: this.fileMessageController.value
    };

    if (this.sendBeforCheck()) {
      GlobalData.openLoadingModal();

      if (this.postId !== -1) {
        // 更新文章
        const idx: number = this.listPostData.findIndex(
          (e) => e.id === this.postId
        );

        if (idx !== -1) {
          const isSuccess: Boolean = await new PostService().updatePost(
            this.postId,
            postData
          );

          /// 投稿失敗
          if (!isSuccess) {
            GlobalData.closeLoadingModal();
            return;
          }

          /// 投稿成功
          this.listPostData[idx].mainMessage = postData.content;
          this.listPostData[idx].fileMessage = postData.fileMessage;

          this.modalController.show(
            confimModal,
            {
              modalText: "更新成功",
              confirmFunc: () => {
                this.modalController.close();
                this.modalController.closeByHaveId("postedit");
              }
            },
            false,
            false,
            "rgba(0, 0, 0, 0.4)",
            "confirmModal"
          );
          GlobalData.closeLoadingModal();
        }
      } else {
        // 創建文章
        const postId: Number = await new PostService().createPost(postData);
        GlobalData.closeLoadingModal();

        if (postId == -1) {
          return;
        }

        this.modalController.show(
          confimModal,
          {
            modalText: "投稿成功",
            confirmFunc: () => {
              this.modalController.close();
              this.modalController.closeByHaveId("postedit");
            }
          },
          false,
          false,
          "rgba(0, 0, 0, 0.4)",
          "confirmModal"
        );

        const postBoardType: PostBoard =
          GlobalData.postBoard.find((e) => e.type === postData.type) ??
          GlobalData.postBoard[0];

        if (this.needCreatePostAddPage) {
          const createdPost: Post = {
            id: postId as number,
            createdBy: userDataStore.userData.value.uid,
            mainMessage: postData.content,
            fileMessage: postData.fileMessage,
            viewed: 0,
            good: 0,
            type: postBoardType,
            count: 0,
            userIsGood: false,
            postTime: new DateFormatUtilities().getUTCFormattedDateTime(),
            user: userDataStore.userData.value
          };

          this.listPostData.splice(0, 0, createdPost);
        }
      }
    }
  };

  /**
   * MARK: 送出前check
   */
  sendBeforCheck = (): boolean => {
    let isOk: boolean = true;
    if (this.mainMessageController.value.replaceAll(" ", "") === "") {
      isOk = false;
      console.log("內文不得為空");
    }
    return isOk;
  };
}
