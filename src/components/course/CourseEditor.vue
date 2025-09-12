<script setup lang="ts">
import CourseEditViewModel from "@/view_models/course/course_edit_view_model";
import RichTextEditor from "@/components/course/RichTextEditor.vue";
import { SkillType } from "@/models/skill_type";
import { GlobalData } from "@/global/global_data";
import CourseChapterEdit from "./CourseChapterEdit.vue";
import { onBeforeMount } from "@vue/runtime-core";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import MainButton from "@/components/utilities/MainButton.vue";

const viewModel = new CourseEditViewModel();

const levelItems: string[] = ["1", "2", "3", "4", "5"];

const props = defineProps<{
  modalProps: object;
}>();

onBeforeMount(() => {
  if (Object.keys(props.modalProps).length !== 0) {
    /// 導入文章
    viewModel.editInit(
      props.modalProps.courseData,
      props.modalProps.listCourseData
    );
  }
});
</script>

<template>
  <div class="courseContianer">
    <input
      type="text"
      placeholder="標題"
      v-model="viewModel.titleController.value"
      class="textInput"
    />

    <textarea
      v-model="viewModel.outlineController.value"
      placeholder="大綱"
      rows="4"
      cols="50"
    ></textarea>

    <textarea
      v-model="viewModel.beforeNeedController.value"
      placeholder="前置需求"
      rows="4"
      cols="50"
    ></textarea>

    <div class="selectContainer">
      <i class="fa-solid fa-layer-group" :style="{ fontSize: '18px' }"></i>
      <select v-model="viewModel.selectedLevel.value">
        <option value="" disabled selected>選擇一個程度</option>
        <option
          v-for="(item, index) in levelItems"
          v-bind:key="item"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <i
        class="fa-solid fa-angle-down"
        :style="{ color: 'white', marginRight: '20px' }"
      ></i>

      <i class="fa fa-tag" :style="{ fontSize: '18px' }"></i>

      <select v-model="viewModel.selectedType.value.id">
        <option value="" disabled selected>選擇一個類別</option>
        <option
          v-for="(item, index) in new SkillType().types"
          v-bind:key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <i class="fa-solid fa-angle-down" style="color: white"></i>
    </div>

    <multiselect
      v-model="viewModel.selectedSkill.value"
      :options="GlobalData.skillData"
      :multiple="true"
      label="name"
      track-by="id"
      placeholder="選擇學習的技能..."
      :max="4"
      :style="{ width: '300px', marginBottom: '10px' }"
    ></multiselect>

    <div class="detailInfo">
      <p>詳細內容</p>
      <RichTextEditor
        v-model:htmlString="viewModel.htmlString.value"
      ></RichTextEditor>
    </div>

    <div class="chapterBar">
      <MainButton
        :onPress="
          () => {
            viewModel.addChapter();
          }
        "
        text="章節＋"
      >
      </MainButton>

      <div class="chapterBarRight">
        <p>公開</p>
        <input type="checkbox" v-model="viewModel.isPublic.value" />
      </div>
    </div>

    <div
      v-for="(chapterEditInfo, index) in viewModel.chapters.value"
      v-bind:key="chapterEditInfo"
    >
      <CourseChapterEdit
        v-model:title="chapterEditInfo.title"
        v-model:content="chapterEditInfo.content"
        :deleteChapter="() => viewModel.deleteChapter(index)"
        :haschangeChapter="index != viewModel.chapters.value.length - 1"
        :changeChapter="() => viewModel.changeChapterIndex(index)"
      ></CourseChapterEdit>
    </div>
  </div>
  <MainButton
    :onPress="() => viewModel.send()"
    class="sendBtn"
    text="送出"
  ></MainButton>
</template>

<style scoped>
.courseContianer {
  background-color: rgb(49, 49, 50);
  width: 90vw;
  height: 91vh;
  max-width: 850px;
  padding: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.selectContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
}

.chapterBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}

.chapterBar .chapterBarRight {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detailInfo p {
  padding: 5px 10px;
}

.sendBtn {
  background-color: rgb(90, 91, 91);
}

.chapterBarRight input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
}

.chapterBarRight input[type="checkbox"]:hover {
  border-color: #f3892c;
}

.chapterBarRight input[type="checkbox"]:checked {
  background-color: #ffffff;
  mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6 10.2 3.5 7.7 2.1 9.1l3.9 3.9 7.9-7.9-1.4-1.4z'/></svg>")
    no-repeat center / 70%;
  -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6 10.2 3.5 7.7 2.1 9.1l3.9 3.9 7.9-7.9-1.4-1.4z'/></svg>")
    no-repeat center / 70%;
}
</style>
