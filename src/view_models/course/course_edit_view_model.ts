import { SkillType, SkillTypes, type SkillTypeModel } from "@/models/skill_type";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import type { ChapterEditModel } from "./chapter_edit_model";


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


    /**
     * MARK: 送出按鈕
     */
    send = async (): Promise<void> => {
        const formattedString: string = await new RichTextEditorViewModel().formatToDataBaseStr(this.htmlString.value);
        console.log(`title: ${this.titleController.value} 
            outline: ${this.outlineController.value} 
            beforeNeed: ${this.beforeNeedController.value}
            selectedLevel: ${this.selectedLevel.value}
            selectedType: ${this.selectedType.value.name}
            shousainaiyou: ${formattedString}
            isPublic: ${this.isPublic.value}
            selectedSkill: ${this.selectedSkill.value}
            chapters: ${this.chapters.value}
         `);


        debugger
    };


    addChapter = (): void => {
        const newChapter: ChapterEditModel = {
            title: "",
            content: ""
        };

        this.chapters.value.push(newChapter);
    }

    deleteChapter = (index: number): void => {
        this.chapters.value.splice(index);
    }

    changeChapterIndex = (index: number): void => {
        const temp: ChapterEditModel = this.chapters.value[index];
        this.chapters.value[index] = this.chapters.value[index + 1];
        this.chapters.value[index + 1] = temp;
    }
}
