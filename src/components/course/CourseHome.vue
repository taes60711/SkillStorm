<template>
  <BaseView :apiListFunc="getCourseList" @apiReturnData="handleApiReturnData">
    <template #apiListHeader>
      <MainButton :onPress="goToEdit" class="createButton">
        <i class="fa-solid fa-pen" :style="{ fontSize: '20px' }"></i>
      </MainButton>
    </template>

    <template #apiListBody>
      <div
        class="courseItemContainer"
        v-for="(item, index) in courseData"
        v-bind:key="index"
      >
        <MainButton :needOpacity="false" :onPress="() => toDetailPage(item)">
          <div class="courseItemTopbar">
            <div class="topUserBar">
              <Avatar
                :imgurl="item.user.image"
                size="40px"
                borderRadius="50px"
              />
              <p :style="{ paddingLeft: '10px' }">{{ item.user.name }}</p>
              <p :style="{ color: 'rgb(132, 131, 131)' }">
                •{{ dateTimeFormat.format(item.createdTime) }}
              </p>
            </div>

            <MainButton
              :onPress="() => openItemSetting()"
              :style="{ paddingRight: '16px' }"
            >
              <i class="fa-solid fa-ellipsis"></i>
            </MainButton>
          </div>
          <p>{{ item.title }}</p>

          <div class="typebar">
            <i class="fa-solid fa-tag" :style="{ paddingRight: '5px' }"></i>
            <p>{{ new SkillType().getTypeName(item.type) }}</p>

            <SkillTag
              :skillName="skills"
              v-for="(skills, index) in item.courseLearningkillList"
            ></SkillTag>
          </div>

          <p>{{ item.beforeNeed }}</p>
          <p>程度{{ item.needLevel }}</p>
          <p>{{ item.content }}</p>

          <p :style="{ color: 'rgb(132, 131, 131)' }">
            最終更新日{{ dateTimeFormat.format(item.createdTime) }}
          </p>
        </MainButton>
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
import { DateFormatUtilities } from "@/global/date_time_format";
import MainButton from "../utilities/MainButton.vue";
import { SkillType } from "@/models/skill_type";
import SkillTag from "@/components/utilities/SkillTag.vue";
import { ModalController } from "../utilities/Modal/ModalController";
import CourseDetail from "@/components/course/CourseDetail.vue";

const modalController: ModalController = new ModalController();
const dateTimeFormat = new DateFormatUtilities();

function toDetailPage(data: Course) {
  console.log(data);

  modalController.show(
    CourseDetail,
    { courseData: data },
    true,
    false,
    "rgba(0, 0, 0, 0.4)",
    "CourseDetail"
  );
}

function openItemSetting() {
  console.log(new SkillType().getTypeName(0));
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
  margin-bottom: 10px;
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

.typebar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.createButton {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: rgb(80, 82, 82);
}
</style>
