<template>
  <div class="courseDetailContainer">
    <p>
      {{ props.modalProps.courseData.title }}
    </p>
    <p>
      {{ props.modalProps.courseData.beforeNeed }}
    </p>
    <p>詳細內容 {{ props.modalProps.courseData.content }}</p>
    <p>程度 {{ props.modalProps.courseData.needLevel }}</p>

    <div class="typebar">
      <i class="fa-solid fa-tag" :style="{ paddingRight: '5px' }"></i>
      <p>{{ new SkillType().getTypeName(props.modalProps.courseData.type) }}</p>
      <SkillTag
        :skillName="skills"
        v-for="(skills, index) in props.modalProps.courseData
          .courseLearningkillList"
      ></SkillTag>
    </div>

    <div
      v-for="(courseChapterItem, index) in props.modalProps.courseData
        .courseChapters"
    >
      <p>章節：{{ courseChapterItem.chapterName }}</p>
      <div v-for="(chapterContent, index) in courseChapterItem.content">
        <div
          v-html="new RichTextEditorViewModel().formatToViewStr(chapterContent)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkillType } from "@/models/skill_type";
import SkillTag from "@/components/utilities/SkillTag.vue";
import RichTextEditorViewModel from "@/view_models/rich_text_ediotor_view_model";

const props = defineProps<{
  modalProps: object;
}>();
</script>

<style scoped>
.courseDetailContainer {
  background-color: rgb(49, 49, 50);
  width: 85vw;
  height: 96vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  padding: 15px 15px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
}

.courseDetailContainer::-webkit-scrollbar {
  display: none;
}

.typebar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
