<script setup lang="ts">
import CourseEditViewModel from "@/view_models/course/course_edit_view_model";
import RichTextEditor from "../utilities/RichTextEditor.vue";
import { SkillType } from "@/models/skill_type";
import { GlobalData } from "@/global/global_data";
import CourseChapterEdit from "./CourseChapterEdit.vue";
import { onBeforeMount } from "@vue/runtime-core";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

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
    <p>標題</p>
    <input type="text" v-model="viewModel.titleController.value" />

    <p>大綱</p>
    <textarea
      v-model="viewModel.outlineController.value"
      placeholder="大綱"
      rows="4"
      cols="50"
    ></textarea>

    <p>前置需求</p>
    <textarea
      v-model="viewModel.beforeNeedController.value"
      placeholder="前置需求"
      rows="4"
      cols="50"
    ></textarea>

    <p>程度</p>
    <select
      v-model="viewModel.selectedLevel.value"
      style="background-color: #f0f8ff; color: #333"
    >
      <option value="" disabled selected>選擇一個程度</option>
      <option
        v-for="(item, index) in levelItems"
        v-bind:key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>

    <p>類別</p>
    <select
      v-model="viewModel.selectedType.value.id"
      style="background-color: #f0f8ff; color: #333"
    >
      <option value="" disabled selected>選擇一個類別</option>
      <option
        v-for="(item, index) in new SkillType().types"
        v-bind:key="item.id"
        :value="item.id"
      >
        {{ item.name }}
      </option>
    </select>

    <p>技能</p>
    <multiselect
      v-model="viewModel.selectedSkill.value"
      :options="GlobalData.skillData"
      :multiple="true"
      label="name"
      track-by="id"
      placeholder="搜尋或選擇技能..."
      :max="4"
      style="width: 300px"
    ></multiselect>

    <p>公開</p>
    <input type="checkbox" v-model="viewModel.isPublic.value" />

    <p>詳細內容</p>
    <RichTextEditor
      v-model:htmlString="viewModel.htmlString.value"
    ></RichTextEditor>

    <button @click="viewModel.addChapter">章節＋</button>
    <div
      v-for="(chapterEditInfo, index) in viewModel.chapters.value"
      v-bind:key="chapterEditInfo"
    >
      <p>章節{{ index }}</p>
      <CourseChapterEdit
        v-model:title="chapterEditInfo.title"
        v-model:content="chapterEditInfo.content"
      ></CourseChapterEdit>
      <button @click="viewModel.deleteChapter(index)">刪除該章節</button>
      <button
        v-if="index != viewModel.chapters.value.length - 1"
        @click="viewModel.changeChapterIndex(index)"
      >
        章節往下移動
      </button>
    </div>

    <br />
    <button @click="viewModel.send">送出</button>
  </div>
</template>

<style scoped>
.courseContianer {
  background-color: rgb(49, 49, 50);
  width: 90vw;
  height: 96vh;
  max-width: 850px;
  padding: 10px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
}
button {
  background-color: rgb(0, 0, 0);
  margin: 0 10px 0 0;
  padding: 5px;
}
</style>
