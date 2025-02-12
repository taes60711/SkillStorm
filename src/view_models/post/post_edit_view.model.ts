import type { Ref } from "vue";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";
import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { GlobalData } from "@/global/global_data";

/// 文章編輯ViewModel
export default class PostEditViewModel {

    htmlString: Ref<string> = ref<string>('');

    titleController: Ref<string> = ref<string>('');

    selectedBoard: Ref<PostBoard> = ref<PostBoard>(GlobalData.posBoard[0]);

    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {
        const formattedString: string = await new RichTextEditorViewModel().formatToDataBaseStr(this.htmlString.value);
        console.log(`title: ${this.titleController.value} selectedBoard:${this.selectedBoard.value?.chineseName}  richResult: ${formattedString}`);
    };
}
