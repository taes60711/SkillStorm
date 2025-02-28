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
}