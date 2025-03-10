import ImageService from "@/services/image_service";
import { APIHttpController } from "./api_http_controller";

///編輯器通用的Func
export class EditTools {
    /**
     * 確認輸入框輸入是否符合規則（是否為空）
     * @param controller 輸入框的Controller
     * @param regex 正規化 需求（非必須）
     * @returns true: 符合規則 false:不符合
     */
    checkInputValid = (controller: string, regex?: RegExp): boolean => {
        let isOK: boolean = true;
        const controllerStr: string = controller.replaceAll(" ", "");

        if (controllerStr === "" || !regex?.test(controllerStr)) {
            isOK = false;
        }

        return isOK;
    }

    /**
     * 取得Youtube影片的Id
     * @param url Youtube影片的網址
     * @returns 影片Id
     */
    getYtvideoID(url: string): string {
        let start = 0;

        if (url.includes('/shorts/')) {
            start = url.indexOf('/shorts/') + '/shorts/'.length;
        } else if (url.includes('/youtu.be/')) {
            start = url.indexOf('/youtu.be/') + '/youtu.be/'.length;
        } else if (url.includes('src=')) {
            start = url.indexOf('src="https://www.youtube.com/embed/') + 'src="https://www.youtube.com/embed/'.length;
        } else {
            start = url.indexOf('?v=') + '?v='.length;
        }

        let end = 0;

        if (url.includes('&list')) {
            end = url.indexOf('&list');
        } else if (url.includes('?si')) {
            end = url.indexOf('?si');
        } else if (url.includes('src=')) {
            end = url.indexOf('">');
        } else if (url.includes('&')) {
            end = url.indexOf('&');
        } else {
            end = url.length;
        }

        let tmpId = "";

        if (end === -1 || (!url.includes("youtu.be/") && !url.includes("youtube.com"))) {
            tmpId = "err";
        } else {
            tmpId = url.substring(start, end);
        }

        return tmpId;
    }

    /**
     * 觸發檔案選擇
     */
    triggerFileInput(): void {
        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    }


    /**
     * 處理本地端圖片選擇
     * @param event 本地端圖片選擇
     * @returns base64圖片的String
     */
    handleLocalImgChange(event: Event): Promise<string> {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        return new Promise((resolve, reject) => {
            if (file) {
                // 檢查檔案類型
                if (!file.type.startsWith("image/")) {
                    input.value = ""; // 清空選擇
                    return reject("file format no match");
                }

                // 檢查檔案大小（5MB）
                if (file.size > 5 * 1024 * 1024) {
                    input.value = ""; // 清空選擇
                    return reject("file size large");
                }

                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String: string = reader.result as string;
                    resolve(base64String);
                };

                reader.readAsDataURL(file);
            }
        });
    }


    /**
      * 上傳圖片至Database
      * @param base64ImgStr 未處理過的字串
      * @returns 上傳後的圖片網址
      */
    async uploadImgToDatabase(base64Imgurl: string): Promise<string> {
        const imageService = new ImageService();

        if (base64Imgurl.includes('base64,')) {
            let resultString: String = this.remove64ImgPreFixString(base64Imgurl);
            let uid: String = crypto.randomUUID();

            const imageId: String = await imageService.imageIsExist(resultString);

            if (imageId != "-1") {
                uid = imageId;
            } else {
                await imageService.saveImg(uid, resultString);
            }

            return `${APIHttpController.prefixUrl}://${APIHttpController.databaseDomainStr}/images/${uid}`;
        }
        return "failed";
    }

    /**
     * 取得base64圖片的主要資訊
     * @param base64ImgStr 未處理過的64字串
     * @returns 處理過的64字串
     */
    remove64ImgPreFixString(base64ImgStr: string): string {
        /// <img src=\>
        const match = base64ImgStr.match(/data:image\/png;base64,([^"]+)/);
        if (match) {
            return match[1];
        } else if (base64ImgStr.includes("base64,")) {
            return base64ImgStr.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        } else {
            return "no64Img";
        }

    }

}