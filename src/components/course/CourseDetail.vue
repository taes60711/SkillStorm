<template>
  <div class="courseDetailContainer">
    <p class="title">
      {{ props.modalProps.courseData.title }}
    </p>

    <div class="typebar">
      <IconText
        icon="fa-solid fa-tag"
        :text="`${new SkillType().getTypeName(
          props.modalProps.courseData.type
        )}`"
        :style="{ paddingRight: '5px' }"
      ></IconText>

      <SkillTag
        :skillName="skills"
        v-for="(skills, index) in props.modalProps.courseData
          .courseLearningkillList"
      ></SkillTag>
    </div>

    <div class="introductionContainer">
      {{ props.modalProps.courseData.content }}
    </div>

    <p>
      程度
      <i
        v-for="(skills, index) in props.modalProps.courseData.needLevel"
        class="fa-solid fa-splotch"
      ></i>
    </p>
    <div class="introductionContainer">
      {{ props.modalProps.courseData.beforeNeed }}
    </div>

    <div v-html="props.modalProps.courseData.prStory"></div>

    <p :style="{ color: 'rgb(132, 131, 131)' }">
      最終更新日
      {{ dateTimeFormat.format(props.modalProps.courseData.createdTime) }}
    </p>

    <div
      v-for="(courseChapterItem, index) in props.modalProps.courseData
        .courseChapters"
    >
      <IconText
        icon="fa-solid fa-book"
        :text="courseChapterItem.chapterName"
        class="chapterBar"
      ></IconText>
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
import IconText from "@/components/utilities/IconText.vue";
import { DateFormatUtilities } from "@/global/date_time_format";

const dateTimeFormat = new DateFormatUtilities();

const props = defineProps<{
  modalProps: object;
}>();
</script>

<style scoped>
.courseDetailContainer {
  background-color: rgb(49, 49, 50);
  width: 90vw;
  height: 96vh;
  max-width: 900px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  padding: 20px 15px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
}

.courseDetailContainer .title {
  font-size: 32px;
  font-weight: 600;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(79, 78, 78);
}

.courseDetailContainer::-webkit-scrollbar {
  display: none;
}

.courseDetailContainer .typebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0px;
}

.courseDetailContainer .chapterBar {
  padding: 8px 0px;
  font-size: 23px;
  font-weight: 600;
  color: rgb(202, 198, 198);
  margin: 20px 0px;
  border-bottom: 1px solid rgb(70, 69, 69);
}

.courseDetailContainer .introductionContainer {
  background-color: rgb(74, 73, 72);
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px;
}
</style>
