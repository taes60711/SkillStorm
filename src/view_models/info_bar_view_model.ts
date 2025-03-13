import { ModalController } from "@/components/utilities/Modal/ModalController";
import phoneHintModal from "@/components/utilities/Modal/phoneHintModal.vue";
import { userDataStore } from "@/global/user_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import { ref } from "vue";

export default class InfoBarViewModel {
  settingBarIsOpen = ref<boolean>(false);
  modalController = new ModalController();

  ///登出
  logout = () => {
    if (userDataStore.isLogin()) {
      userDataStore.clearUser();
      router.push(RouterPath.HOME.POST.HOME);
    }
  };

  ///跳至文章頁面
  goToPost = () => {
    router.push(RouterPath.HOME.POST.HOME);
  };

  ///跳至文章頁面
  goToSuggestUser = () => {
    router.push(RouterPath.HOME.SUGGESTUSERS.HOME);
  };

  ///跳至技術分享頁面
  goToCourse = () => {
    router.push(RouterPath.HOME.COURSE.HOME);
  };

  ///跳至個人資料編輯頁面
  goToProfile = () => {
    if (userDataStore.isLogin()) {
      router.push(RouterPath.HOME.PROFILE.INDEX);
    } else {
      router.push(RouterPath.AUTH.LOGIN);
    }
  };

  ///跳至訊息
  goToMessage = () => {
    this.modalController.show(
      phoneHintModal,
      {},
      true,
      true,
      "rgba(0, 0, 0, 0.9)"
    );
    console.log("先引導至App");
  };
}
