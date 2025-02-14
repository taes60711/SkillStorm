import type { Ref } from "vue";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";
import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { GlobalData } from "@/global/global_data";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import PostService from "@/services/post_service";

/// 文章編輯ViewModel
export default class PostEditViewModel {
    /// 內文
    htmlString: Ref<string> = ref<string>('');
    /// 標題
    titleController: Ref<string> = ref<string>('');
    /// 看板
    selectedBoard: Ref<PostBoard> = ref<PostBoard>(GlobalData.posBoard[0]);

    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {
        const formattedString: string = await new RichTextEditorViewModel().formatToDataBaseStr(this.htmlString.value);
        console.log(`title: ${this.titleController.value} selectedBoard:${this.selectedBoard.value?.chineseName}  richResult: ${formattedString}`);
        const postData: CreatePostRequestData = {
            title: this.titleController.value,
            type: this.selectedBoard.value.id,
            content: formattedString,
        };
        await new PostService().createPost(postData);

    };
}
