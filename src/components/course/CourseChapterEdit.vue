<script setup lang="ts">
import RichTextEditor from "../utilities/RichTextEditor.vue";
import MainButton from "@/components/utilities/MainButton.vue";
const title = defineModel("title");
const content = defineModel("content");

const deleteChapter = defineModel("deleteChapter");

const haschangeChapter = defineModel("haschangeChapter");
const changeChapter = defineModel("changeChapter");
</script>

<template>
  <div class="courseChapterEditContainer">
    <div class="tt">
      <input
        type="text"
        v-model="title"
        placeholder="章節標題"
        class="textInput"
      />

      <MainButton :onPress="deleteChapter" class="main-button">
        <i class="fa-solid fa-trash"></i>
      </MainButton>

      <MainButton :onPress="haschangeChapter" class="main-button">
        <i class="fa-solid fa-arrow-turn-down"></i>
      </MainButton>
    </div>

    <RichTextEditor
      v-model:htmlString="content"
      placeholder="章節內文"
    ></RichTextEditor>
  </div>
</template>

<style scoped>
.courseChapterEditContainer {
  padding: 5px px;
}

.tt {
  display: flex;
  flex-direction: row;
}

.courseChapterEditContainer .tt .textInput {
  flex: 1;
  min-width: 0;
  border: none;
  padding-left: 10px;
}

.courseChapterEditContainer .tt .main-button {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
