import { createApp, type DefineComponent } from "@vue/runtime-dom";

export class ModalController {
  modalId: string = "modalId";

  /**
   * 開啟Modal
   * @param modalContent Modal內中間內容Vue
   */
  show = (
    modalContent: DefineComponent<{}, {}, any>,
    modalProps: object = {},
    needCloseBtn: boolean = true,
    needModalClose: boolean = true,
    markColor: string = "rgba(0, 0, 0, 0.4)",
    modalId: string = "modalId"
  ): void => {
    if (document.getElementById(modalId)) {
      console.log("畫面已經存在 modalId, 請調整別的modalId");
      return;
    }

    this.modalId = modalId;
    // 在 body 中添加新的 div
    const modalElement = document.createElement("div");
    modalElement.setAttribute("id", this.modalId);
    document.documentElement.appendChild(modalElement);

    // 在 body添加的div 內 創建 BaseModal
    import("../Modal/BaseModal.vue").then((module) => {
      const ModalComponent = module.default;
      // Modal內的Content
      const contnet = modalContent;

      const app = createApp(ModalComponent, {
        modalContent: contnet,
        modalProps,
        needCloseBtn: needCloseBtn,
        markColor: markColor,
        closePage: this.close,
        needModalClose: needModalClose,
      });

      app.mount(modalElement);
    });
  };

  /**
   * 關閉Modal
   */
  close = (): void => {
    // 藉由show創建的modalId 關閉Modal
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      // 移除該元素
      modalElement.remove();
    }
  };
}
