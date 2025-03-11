import { createApp, type DefineComponent } from "@vue/runtime-dom";

export class ModalController {
    modalId: string = "modalId";

    /**
     * 開啟Modal
     * @param modalContent Modal內中間內容Vue
     */
    show = (modalContent: DefineComponent<{}, {}, any>, modalProps: object = {}, needCloseBtn: boolean = true, markColor: string = 'rgba(0, 0, 0, 0.4)'): void => {
        // 在 body 中添加新的 div
        const modalElement = document.createElement("div");
        modalElement.setAttribute("id", this.modalId);
        document.documentElement.appendChild(modalElement);

        // 在 body添加的div 內 創建 BaseModal
        import("../BaseModal/BaseModal.vue").then((module) => {
            const ModalComponent = module.default;
            // Modal內的Content
            const contnet = modalContent;

            const app = createApp(ModalComponent, {
                modalContent: contnet,
                modalProps,
                needCloseBtn: needCloseBtn,
                markColor: markColor,
                closePage: this.close,
            });

            app.mount(modalElement);
        });
    }

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
    }
}