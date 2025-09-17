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
import { ModalController } from "@/components/utilities/Modal/ModalController";
import confimModal from "@/components/utilities/Modal/confirmModal.vue";
import { userDataStore } from "@/global/user_data";
import { DateFormatUtilities } from "@/global/date_time_format";

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

  modalController = new ModalController();

  createEditInit = (listData: Course[]): void => {
    this.listCourseData = listData;
  };

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
    /// 送出前確認
    if (this.sendBeforCheck()) {
      /// Open Loading
      GlobalData.openLoadingModal();
      if (this.coursetId !== -1) {
        ///　更新
        const idx: number = this.listCourseData.findIndex(
          (e) => e.id === this.coursetId
        );

        if (idx !== -1) {
          const isSuccess: Boolean = await new CourseService().updateCourse(
            data,
            this.coursetId
          );

          if (isSuccess != true) {
            /// Close Loading
            GlobalData.closeLoadingModal();
            return;
          }

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
          /// Close Loading
          GlobalData.closeLoadingModal();
          /// 更新成功Hint
          this.modalController.show(
            confimModal,
            {
              modalText: "更新成功",
              confirmFunc: () => {
                this.modalController.close();
                this.modalController.closeByHaveId("courseEdit");
              }
            },
            false,
            false,
            "rgba(0, 0, 0, 0.4)",
            "confirmModal"
          );
        }
      } else {
        ///　作成
        const courseIndex: Number = await new CourseService().createCourse(
          data
        );

        console.log(courseIndex);
        /// Close Loading
        GlobalData.closeLoadingModal();
        if (courseIndex == -1) {
          return;
        }

        const createdCourse: Course = {
          id: courseIndex as number,
          createdBy: userDataStore.userData.value.uid,
          title: data.title,
          needLevel: data.needLevel,
          content: data.outline,
          beforeNeed: data.beforeNeed,
          prStory: data.prStory,
          courseChapters: data.courseChapters,
          courseLearningkillList: data.learningkillList,
          createdTime: new DateFormatUtilities().getUTCFormattedDateTime(),
          type: data.type,
          isPublic: false,
          signUpStatus: "",
          user: userDataStore.userData.value,
          isLike: false
        };

        this.listCourseData.splice(0, 0, createdCourse);

        /// 作成成功Hint
        this.modalController.show(
          confimModal,
          {
            modalText: "投稿成功",
            confirmFunc: () => {
              this.modalController.close();
              this.modalController.closeByHaveId("courseEdit");
            }
          },
          false,
          false,
          "rgba(0, 0, 0, 0.4)",
          "confirmModal"
        );
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
