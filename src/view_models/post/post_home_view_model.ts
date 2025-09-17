import { ModalController } from "@/components/utilities/Modal/ModalController";
import PostEditor from "@/components/post/PostEditor.vue";
import PostDetail from "@/components/post/PostDetail.vue";
import PostService from "@/services/post_service";
import { userDataStore } from "@/global/user_data";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import HintModal from "@/components/utilities/Modal/HintModal.vue";
import ShareModal from "@/components/utilities/Modal/ShareModal.vue";

export default class PostHomeViewModel {
  modalController: ModalController = new ModalController();

  ///開啟文章發佈頁面
  createEditPage = (listData: Post[]) => {
    if (userDataStore.isLogin()) {
      this.modalController.show(
        PostEditor,
        {
          listPostData: listData
        },
        true,
        false,
        "rgba(0, 0, 0, 0.4)",
        "postedit"
      );
    } else {
      this.modalController.show(
        HintModal,
        {
          modalText: "請登入帳號",
          cancelFunc: () => {
            this.modalController.close();
          },
          confirmFunc: () => {
            this.modalController.close();
            router.push(RouterPath.AUTH.LOGIN.path);
          }
        },
        false,
        true,
        "rgba(0, 0, 0, 0.4)",
        "loginHintModal"
      );
    }
  };

  ///開啟文章發佈頁面
  editPage = (listData: Post[], data: Post) => {
    const editPageData: CreatePostRequestData = {
      postId: data.id,
      type: data.type,
      content: data.mainMessage,
      fileMessage: data.fileMessage
    };
    this.modalController.show(
      PostEditor,
      { postData: editPageData, listPostData: listData },
      true,
      false,
      "rgba(0, 0, 0, 0.4)",
      "postedit"
    );
  };

  ///開啟文章詳細頁
  toDetailPage = (listData: Post[], data: Post) => {
    console.log(data);

    this.modalController.show(
      PostDetail,
      { postData: data, listData: listData },
      true,
      true,
      "rgba(0, 0, 0, 0.4)",
      "postDetail"
    );
  };

  ///“最新”文章
  getNewPostList: (page: number, size: number) => Promise<Post[]> = (
    page,
    size
  ) => {
    return new PostService().getPostBytime(
      page,
      size,
      userDataStore.userData.value.uid
    );
  };

  ///“人氣”文章
  getViewerPostList: (page: number, size: number) => Promise<Post[]> = (
    page,
    size
  ) => {
    return new PostService().getPostByViewer(
      page,
      size,
      userDataStore.userData.value.uid
    );
  };

  ///“看板”文章
  getBoardPostList(
    type: number
  ): (page: number, size: number) => Promise<Post[]> {
    return (page: number, size: number): Promise<Post[]> => {
      return new PostService().getPostByType(
        page,
        size,
        userDataStore.userData.value.uid,
        type
      );
    };
  }

  ///“個人資料的我的”文章
  getProfileList: (page: number, size: number) => Promise<Post[]> = (
    page,
    size
  ) => {
    return new PostService().getPostByMy(
      page,
      2,
      userDataStore.userData.value.uid
    );
  };

  ///“我的”文章
  getMyPostList: (page: number, size: number) => Promise<Post[]> = (
    page,
    size
  ) => {
    return new PostService().getPostByMy(
      page,
      size,
      userDataStore.userData.value.uid
    );
  };

  changeHomePage = (homePageType: string) => {
    console.log(homePageType);

    if (homePageType === "new") {
      router.push(RouterPath.HOME.POST.HOME.path);
    } else {
      router.push(RouterPath.HOME.POST.POPULAR.path);
    }
  };

  // 按讚收讚
  changeLike = async (listData: Post[], data: Post) => {
    if (
      data.user.uid === userDataStore.userData.value.uid ||
      !userDataStore.isLogin()
    ) {
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

  ///刪除文章
  deletePost = async (listData: Post[], data: Post) => {
    const idx: number = listData.findIndex((e) => e.id === data.id);

    if (idx !== -1) {
      this.modalController.show(
        HintModal,
        {
          modalText: "確定要刪除該篇文章?",
          needTitile: true,
          cancelFunc: () => {
            this.modalController.close();
          },
          confirmFunc: async () => {
            const isSuccess: Boolean = await new PostService().deletePost(
              data.id
            );
            if (isSuccess) {
              listData.splice(idx, 1);
              this.modalController.close();
            }
          }
        },
        false,
        true,
        "rgba(0, 0, 0, 0.4)",
        "deletePostModal"
      );
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
