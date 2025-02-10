import type { Ref } from "vue";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";

/// 文章編輯ViewModel
export default class PostEditViewModel {

    htmlString: Ref<string> = ref<string>('');

    titleController: Ref<string> = ref<string>('');

    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {
        const formattedString: string = await new RichTextEditorViewModel().formatToDataBaseStr(this.htmlString.value);
        console.log(`title: ${this.titleController.value}   richResult: ${formattedString}`);
    };
}
