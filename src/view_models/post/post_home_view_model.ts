import { ModalController } from "@/components/utilities/Modal/ModalController";
import PostEditor from "@/components/post/PostEditor.vue";
import { ref } from "vue";

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

  changeHomePage = (homePageType: string) => {
    console.log(homePageType);
    this.nowHomePage.value = homePageType;
  };
}
