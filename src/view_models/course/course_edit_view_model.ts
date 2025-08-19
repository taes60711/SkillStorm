import { ProgramSkillType, type SkillTypeModel } from "@/models/skill_type";
import { ref } from "vue";
import RichTextEditorViewModel from "../rich_text_ediotor_view_model";
import type { SkillData } from "@/models/reponse/skill_reponse_data";
import type { ChapterEditModel } from "./chapter_edit_model";
import type {
  ChapterData,
  CreateCourseRequestData
} from "@/models/request/course/create_course_request_data";
import CourseService from "@/services/course_service";
import type { Course } from "@/models/reponse/course/course_reponse_data";
import { GlobalData } from "@/global/global_data";

/// 課程編輯ViewModel
export default class CourseEditViewModel {
  titleController = ref<string>("");
  outlineController = ref<string>("");
  beforeNeedController = ref<string>("");
  selectedLevel = ref<string>("1");
  selectedType = ref<SkillTypeModel>({
    id: ProgramSkillType.frontend,
    name: "前端"
  });
  isPublic = ref<boolean>(true);
  htmlString = ref<string>("");

  selectedSkill = ref<SkillData[]>([]);

  chapters = ref<ChapterEditModel[]>([]);

  coursetId: number = -1;
  listCourseData: Course[] = [];

  /// 發文成功的Modal顯示
  showCourseSuccessModalController = ref<boolean>(false);

  editInit = (courseData: Course, listData: Course[]): void => {
    this.titleController.value = courseData.title;
    this.outlineController.value = courseData.content;
    this.beforeNeedController.value = courseData.beforeNeed;
    this.selectedLevel.value = courseData.needLevel.toString();
    this.isPublic.value = courseData.isPublic;
    this.htmlString.value = courseData.prStory;
    this.chapters.value = courseData.courseChapters.map((e) => ({
      title: e.chapterName,
      content: e.content[0]
    }));

    this.selectedSkill.value = courseData.courseLearningkillList.map((e) => {
      const skill = GlobalData.skillData.find((s) => s.name === e);
      return {
        id: skill ? skill.id : 0,
        name: e
      };
    });

    this.coursetId = courseData.id;
    this.listCourseData = listData;
  };

  /**
   * MARK: 送出按鈕
   */
  send = async (): Promise<void> => {
    const formattedString: string =
      await new RichTextEditorViewModel().formatToDataBaseStr(
        this.htmlString.value
      );
    const formattedApiChapter: ChapterData[] = [];

    for (let i = 0; i < Array.from(this.chapters.value).length; i++) {
      const chapterData: ChapterEditModel = this.chapters.value[i];
      const formattedChapterStr: string =
        await new RichTextEditorViewModel().formatToDataBaseStr(
          chapterData.content
        );

      formattedApiChapter.push({
        chapter: i + 1,
        chapterName: chapterData.title,
        content: [formattedChapterStr]
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
      isPublic: this.isPublic.value
    };

    if (this.sendBeforCheck()) {
      if (this.coursetId !== -1) {
        const idx: number = this.listCourseData.findIndex(
          (e) => e.id === this.coursetId
        );

        if (idx !== -1) {
          await new CourseService().updateCourse(data, this.coursetId);
          this.listCourseData[idx].title = data.title;
          this.listCourseData[idx].needLevel = data.needLevel;
          this.listCourseData[idx].content = data.outline;
          this.listCourseData[idx].beforeNeed = data.beforeNeed;
          this.listCourseData[idx].prStory = data.prStory;
          this.listCourseData[idx].courseChapters = data.courseChapters;
          this.listCourseData[idx].courseLearningkillList =
            data.learningkillList;
          this.listCourseData[idx].type = data.type;
          this.listCourseData[idx].isPublic = data.isPublic;
        }
      } else {
        await new CourseService().createCourse(data);
        this.resetAllEditData();
        this.showCourseSuccessModalController.value = true;
      }
    }
  };

  /**
   * MARK: 送出前check
   */
  sendBeforCheck = (): boolean => {
    let isOk: boolean = true;
    if (this.titleController.value.replaceAll(" ", "") === "") {
      isOk = false;
      console.log("標題不得為空");
    }
    if (this.outlineController.value.replaceAll(" ", "") === "") {
      isOk = false;
      console.log("大綱不得為空");
    }
    if (this.beforeNeedController.value.replaceAll(" ", "") === "") {
      isOk = false;
      console.log("前置不得為空");
    }
    if (this.selectedSkill.value.length == 0) {
      isOk = false;
      console.log("技能不得為空");
    }
    if (this.chapters.value.length == 0) {
      isOk = false;
      console.log("章節不得為空");
    }

    for (let i = 0; i < this.chapters.value.length; i++) {
      if (this.chapters.value[i].title.replaceAll(" ", "") === "") {
        isOk = false;
        console.log(`章節${i}的標題不得為空`);
      }
      if (this.chapters.value[i].content.replaceAll(" ", "") === "") {
        isOk = false;
        console.log(`章節${i}的內文不得為空`);
      }
    }

    return isOk;
  };

  /**
   * 清空所有編輯的資料（暫時）
   */
  private resetAllEditData = (): void => {
    this.titleController.value = "";
    this.outlineController.value = "";
    this.beforeNeedController.value = "";
    this.selectedLevel.value = "1";
    this.selectedType.value = { id: ProgramSkillType.frontend, name: "前端" };
    this.isPublic.value = true;
    this.htmlString.value = "";
    this.selectedSkill.value = [];
    this.chapters.value = [];
  };

  addChapter = (): void => {
    const newChapter: ChapterEditModel = { title: "", content: "" };
    this.chapters.value.push(newChapter);
  };

  deleteChapter = (index: number): void => {
    this.chapters.value.splice(index, index + 1);
  };

  changeChapterIndex = (index: number): void => {
    const temp: ChapterEditModel = this.chapters.value[index];
    this.chapters.value[index] = this.chapters.value[index + 1];
    this.chapters.value[index + 1] = temp;
  };
}
