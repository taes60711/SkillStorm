import { ModalController } from "@/components/utilities/Modal/ModalController";
import { userDataStore } from "@/global/user_data";
import type { PostComment } from "@/models/reponse/post/post_comment_reponse_data";
import type { CreatePostCommentRequestData } from "@/models/request/post/create_post_comment_request_data";
import PostService from "@/services/post_service";
import { type Ref, ref } from "vue";
import HintModal from "@/components/utilities/Modal/HintModal.vue";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import ShareModal from "@/components/utilities/Modal/ShareModal.vue";

export default class postDetailViewModel {
  postId: Ref<number> = ref<number>(-1);
  postCommentData: Ref<PostComment[]> = ref<PostComment[]>([]);
  commentInput: Ref<string> = ref<string>("");
  commentIsEdit: Ref<Boolean> = ref<Boolean>(false);
  postCommentUID: Ref<number> = ref<number>(-1);
  modalController: ModalController = new ModalController();

  init(enterPostId: number) {
    this.postId.value = enterPostId;
  }

  /// 文章詳細頁面的留言
  getPostComment(): (page: number, size: number) => Promise<PostComment[]> {
    return (page: number, size: number): Promise<PostComment[]> => {
      return new PostService().getPostComment(page, size, this.postId.value);
    };
  }

  /// 文章詳細頁面的留言
  handleApiCommentReturnData = (data: PostComment[]) => {
    this.postCommentData.value.push(...data);
  };

  /// 創建文章詳細頁面的留言
  createPostComment = async () => {
    /// 輸入文字為空不能創建留言
    if (this.commentInput.value.replace(" ", "") == "") {
      return;
    }

    const commnetData: CreatePostCommentRequestData = {
      postUID: this.postId.value,
      message: this.commentInput.value
    };

    const postCommentId: Number = await new PostService().createPostComment(
      commnetData
    );

    console.log(
      `createPostComment ${postCommentId}. commentMessage: ${this.commentInput.value}`
    );

    this.postCommentData.value.unshift({
      id: postCommentId as number,
      postId: this.postId.value,
      userUid: userDataStore.userData.value.uid,
      message: this.commentInput.value,
      postTime: new Date().toISOString(),
      user: userDataStore.userData.value
    });

    this.commentInput.value = "";
  };

  /// 刪除文章詳細頁面的留言
  deletePostComment = async (postCommentId: number) => {
    this.modalController.show(
      HintModal,
      {
        modalText: "確定要刪除該留言?",
        needTitile: true,
        cancelFunc: () => {
          this.modalController.close();
        },
        confirmFunc: async () => {
          const isSuccess: Boolean = await new PostService().deletePostComment(
            postCommentId
          );

          if (isSuccess) {
            const idx = this.postCommentData.value.findIndex(
              (item) => item.id === postCommentId
            );
            if (idx !== -1) {
              this.postCommentData.value.splice(idx, 1);
            }
          }
          this.modalController.close();
        }
      },
      false,
      true,
      "rgba(0, 0, 0, 0.4)",
      "fileLengthErrConfirmModal"
    );
  };

  /// 開始編集文章詳細頁面的留言
  editPostCommentStart = (postCommentId: number, commentMsg: string) => {
    this.commentIsEdit.value = true;
    this.commentInput.value = commentMsg;
    this.postCommentUID.value = postCommentId;
  };

  /// 編集文章詳細頁面的留言
  editPostCommentSend = async () => {
    const idx = this.postCommentData.value.findIndex(
      (item) => item.id === this.postCommentUID.value
    );
    if (idx !== -1) {
      if (this.commentInput.value.replaceAll(" ", "") == "") {
        return;
      }

      if (this.postCommentData.value[idx].message == this.commentInput.value) {
        this.commentInput.value = "";
        this.commentIsEdit.value = false;
        return;
      }

      const isSuccess: Boolean = await new PostService().uploadPostComment(
        this.postCommentUID.value,
        this.commentInput.value
      );

      if (isSuccess) {
        this.postCommentData.value[idx].message = this.commentInput.value;
        this.commentInput.value = "";
        this.commentIsEdit.value = false;
      }
    }
  };

  detailPageChangeLike = async (listData: Post[], data: Post) => {
    if (
      data.user.uid === userDataStore.userData.value.uid ||
      !userDataStore.isLogin()
    ) {
      return;
    }

    if (listData == null) {
      return;
    }

    const idx: number = listData.findIndex((e) => e.id === data.id);

    if (idx !== -1) {
      if (data.userIsGood) {
        await new PostService().updatePostGood(data.id);
        data.good = data.good - 1;
      } else {
        await new PostService().updatePostGood(
          data.id,
          userDataStore.userData.value.uid
        );
        data.good = data.good + 1;
      }

      data.userIsGood = !data.userIsGood;

      listData[idx].userIsGood = data.userIsGood;
      listData[idx].good = data.good;
    }
  };

  ///分享文章
  sharePost = async (data: Post) => {
    this.modalController.show(
      ShareModal,
      {
        shareUrl: `/post/${data.id}`
      },
      true,
      true,
      "rgba(0, 0, 0, 0.4)",
      "sharePostModal"
    );
  };
}
