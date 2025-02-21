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
    mainMessageController: Ref<string> = ref<string>('');

    /// 看板
    selectedBoard: Ref<PostBoard> = ref<PostBoard>(GlobalData.posBoard[0]);

    /// 圖片/影片
    fileMessageController: Ref<string[]> = ref<string[]>([]);

    /// 發文成功的Modal顯示
    showPostSuccessModalController = ref<boolean>(false);


    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {

        console.log(`selectedBoard:${this.selectedBoard.value?.chineseName}  richResult: ${this.mainMessageController.value}`);
        const postData: CreatePostRequestData = {
            type: this.selectedBoard.value.id,
            content: this.mainMessageController.value,
            fileMessage: this.fileMessageController.value,
        };
        await new PostService().createPost(postData);
        this.resetAllEditData();
        this.showPostSuccessModalController.value = true;
    };

    /**
     * 清空所有編輯的資料（暫時）
     */
    private resetAllEditData = (): void => {
        this.selectedBoard.value = GlobalData.posBoard[0];
        this.mainMessageController.value = '';
    };

}
