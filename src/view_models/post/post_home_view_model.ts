import { ModalController } from "@/components/utilities/Modal/ModalController";
import PostEditor from "@/components/post/PostEditor.vue";
import PostDetail from "@/components/post/PostDetail.vue";
import PostService from "@/services/post_service";
import { userDataStore } from "@/global/user_data";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";

export default class PostHomeViewModel {
  modalController: ModalController = new ModalController();

  ///開啟文章發佈頁面
  createEditPage = () => {
    this.modalController.show(
      PostEditor,
      {},
      true,
      false,
      "rgba(0, 0, 0, 0.4)",
      "postedit"
    );
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
  toDetailPage = (data: Post) => {
    console.log(data);

    this.modalController.show(
      PostDetail,
      { postData: data },
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

  changeHomePage = (homePageType: string) => {
    console.log(homePageType);

    if (homePageType === "new") {
      router.push(RouterPath.HOME.POST.HOME.path);
    } else {
      router.push(RouterPath.HOME.POST.POPULAR.path);
    }
  };
}
