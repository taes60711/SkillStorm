import { SkillType, type SkillTypeModel } from "@/models/skill_type";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import type { ChapterEditModel } from "./chapter_edit_model";
import type { ChapterData, CreateCourseRequestData } from "@/models/request/course/create_course_request_data";
import CourseService from "@/services/course_service";


/// 課程編輯ViewModel
export default class CourseEditViewModel {
    titleController = ref<string>('');
    outlineController = ref<string>('');
    beforeNeedController = ref<string>('');
    selectedLevel = ref<string>('1');
    selectedType = ref<SkillTypeModel>({ id: SkillType.frontend, name: "前端" });
    isPublic = ref<boolean>(true);
    htmlString = ref<string>('');

    selectedSkill = ref<SkillData[]>([]);
    chapters = ref<ChapterEditModel[]>([]);

    /// 發文成功的Modal顯示
    showCourseSuccessModalController = ref<boolean>(false);

    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {
        const formattedString: string = await new RichTextEditorViewModel().formatToDataBaseStr(this.htmlString.value);
        const formattedApiChapter: ChapterData[] = [];

        for (let i = 0; i < Array.from(this.chapters.value).length; i++) {
            const chapterData: ChapterEditModel = this.chapters.value[i];
            const formattedChapterStr: string = await new RichTextEditorViewModel().formatToDataBaseStr(chapterData.content);

            formattedApiChapter.push({
                chapter: i + 1,
                chapterName: chapterData.title,
                content: [formattedChapterStr],
            });

        }

        const data: CreateCourseRequestData = {
            title: this.titleController.value,
            needLevel: parseInt(this.selectedLevel.value),
            outline: this.outlineController.value,
            beforeNeed: this.beforeNeedController.value,
            prStory: formattedString,
            courseChapters: formattedApiChapter,
            learningkillList: this.selectedSkill.value.map((e) => e.name),
            type: this.selectedType.value.id.toString(),
            isPublic: this.isPublic.value,
        }

        await new CourseService().createCourse(data);


        this.resetAllEditData();
        this.showCourseSuccessModalController.value = true;
    };

    /**
     * 清空所有編輯的資料（暫時）
     */
    private resetAllEditData = (): void => {
        this.titleController.value = '';
        this.outlineController.value = '';
        this.beforeNeedController.value = '';
        this.selectedLevel.value = '1';
        this.selectedType.value = { id: SkillType.frontend, name: "前端" };
        this.isPublic.value = true;
        this.htmlString.value = '';
        this.selectedSkill.value = [];
        this.chapters.value = [];
    };

    addChapter = (): void => {
        const newChapter: ChapterEditModel = { title: "", content: "" };
        this.chapters.value.push(newChapter);
    }

    deleteChapter = (index: number): void => {
        this.chapters.value.splice(index, index + 1);
    }

    changeChapterIndex = (index: number): void => {
        const temp: ChapterEditModel = this.chapters.value[index];
        this.chapters.value[index] = this.chapters.value[index + 1];
        this.chapters.value[index + 1] = temp;
    }
}
