import { ModalController } from "@/components/utilities/Modal/ModalController";
import phoneHintModal from "@/components/utilities/Modal/phoneHintModal.vue";
import { userDataStore } from "@/global/user_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import { ref } from "vue";
import { useRoute } from "vue-router";

export enum apiStatus {
  firstLoading = "firstLoading",
  preDataLoading = "preDataLoading",
  loadingFinish = "loadingFinish",
  noDataCanLoad = "noDataCanLoad",
}

export default class InfoBarViewModel {
  settingBarIsOpen = ref<boolean>(false);
  modalController = new ModalController();
  isShowText = ref<boolean>(true);
  isChoicePagePath = ref<string>("");

  items: object = [
    {
      icon: "fa-solid fa-house",
      text: "主頁",
      path: RouterPath.HOME.POST.HOME.path,
    },
    {
      icon: "fa-solid fa-handshake-angle",
      text: "技能交換",
      path: RouterPath.HOME.SUGGESTUSERS.HOME.path,
    },
    {
      icon: "fa-solid fa-book-open-reader",
      text: "技術分享",
      path: RouterPath.HOME.COURSE.HOME.path,
    },
    {
      icon: "fa-solid fa-comments",
      text: "訊息",
      path: "noPath",
    },
  ];

  init = () => {
    window.addEventListener("resize", this.updateScreenWidth);
    this.updateScreenWidth();
    const route = useRoute();
    this.isChoicePagePath.value = route.path;
  };

  updateScreenWidth = () => {
    if (window.innerWidth > 950) {
      this.isShowText.value = true;
    } else {
      this.isShowText.value = false;
    }
  };

  ///登出
  logout = () => {
    if (userDataStore.isLogin()) {
      userDataStore.clearUser();
      router.push(RouterPath.HOME.POST.HOME);
    }
  };

  /// 切換頁面
  changePage = (path: string) => {
    if (path !== "noPath") {
      router.push(path);
      this.isChoicePagePath.value = path;
    } else {
      this.goToMessage();
    }
  };

  ///跳至個人資料編輯頁面
  goToLoginIn = () => {
    router.push(RouterPath.AUTH.LOGIN);
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
