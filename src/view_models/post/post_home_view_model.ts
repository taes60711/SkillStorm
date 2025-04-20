import { ModalController } from "@/components/utilities/Modal/ModalController";
import PostEditor from "@/components/post/PostEditor.vue";
import { ref } from "vue";
import PostService from "@/services/post_service";
import { userDataStore } from "@/global/user_data";
import type { Post } from "@/models/reponse/post/post_reponse_data";

export default class PostHomeViewModel {
  modalController: ModalController = new ModalController();

  nowHomePage = ref<string>("new");

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
    this.nowHomePage.value = homePageType;
  };
}
