<template>
  <BaseView :apiListFunc="getCourseList" @apiReturnData="handleApiReturnData">
    <template #apiListHeader>
      <button @click="goToEdit">發文</button>
    </template>
    <template #apiListBody>
      <div
        class="courseItemContainer"
        v-for="(item, index) in courseData"
        v-bind:key="index"
      >
        <div class="courseItemTopbar">
          <div class="topUserBar">
            <Avatar :imgurl="item.user.image" size="40px" borderRadius="50px" />
            <p :style="{ paddingLeft: '10px' }">{{ item.user.name }}</p>
              <p :style="{ color: 'rgb(132, 131, 131)' }">
                •{{ dateTimeFormat.format(item.createdTime) }}
              </p>
          </div>

          <MainButton 
            :onPress="()=>openItemSetting()"    
            :style="{ paddingRight: '16px' }">           
            <i class="fa-solid fa-ellipsis"></i>
          </MainButton>
        </div>
        <p>{{ item.title }}</p>
        <p>{{ item.beforeNeed }}</p>
        <p>{{ item.content }}</p>
        <p>{{ item.needLevel }}</p>

        <div class="typebar">
          <i class="fa-solid fa-tag" :style="{paddingRight:'5px'}"></i>
          <p>{{ new skilltype().getTypeName(item.type) }}</p>
        </div>

      
     
        <p v-for="(skills, index) in item.courseLearningkillList" >
          {{ skills }}
        </p>

        <p v-for="(courseChapterItem, index) in item.courseChapters">
          <p>{{ courseChapterItem.chapterName }}</p>
          <div v-for="(chapterContent, index) in courseChapterItem.content">
            <span v-html="chapterContent"></span>
          </div>
        </p>

      </div>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import BaseView from "@/components/utilities/BaseView.vue";
import CourseService from "@/services/course_service";
import { userDataStore } from "@/global/user_data";
import type { Course } from "@/models/reponse/course/course_reponse_data";
import { ref } from "vue";
import Avatar from "@/components/utilities/Avatar.vue";
import RichTextEditorViewModel from "@/view_models/rich_text_ediotor_view_model";
import { DateFormatUtilities } from "@/global/date_time_format";
import MainButton from "../utilities/MainButton.vue";
import { skilltype } from "@/models/skill_type";

const richTextEditor: RichTextEditorViewModel = new RichTextEditorViewModel();
const dateTimeFormat = new DateFormatUtilities();

function openItemSetting() {
  console.log(new skilltype().getTypeName(0));
}

///跳至文章編集頁面
const goToEdit = () => {
  router.push(RouterPath.HOME.COURSE.EDIT);
};

const courseData = ref<Course[]>([]);

function handleApiReturnData(data: Course[]) {
  courseData.value.push(...data);
}

const getCourseList: (page: number, size: number) => Promise<Course[]> = (
  page,
  size
) => {
  return new CourseService().getAllCourse(
    page,
    size,
    userDataStore.userData.value.uid
  );
};
</script>

<style scoped>
.courseItemContainer {
  width: 100%;
  border-bottom: solid rgb(54, 53, 53) 1px;
  overflow-wrap: anywhere;
  padding: 10px 0 10px 0;
}

.courseItemContainer .courseItemTopbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.courseItemTopbar .topUserBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
}


.typebar{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
