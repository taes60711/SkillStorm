<script setup lang="ts">
import { onBeforeRouteLeave } from "vue-router";
import EditProfileViewModel from "@/view_models/profile/edit_view_model";
import SkillBarSelect from "./SkillBarSelect.vue";
import { onBeforeMount, ref } from "@vue/runtime-core";
import Avatar from "@/components/utilities/Avatar.vue";
import MainButton from "@/components/utilities/MainButton.vue";

const viewModel = new EditProfileViewModel();

// 路由守衛只負責調用 ViewModel 的方法
onBeforeRouteLeave((to, from, next) => {
  viewModel.setupRouteGuard((canLeave) => {
    next(canLeave);
  });
});

onBeforeMount(async () => {
  try {
    await viewModel.initializeForm();
    console.log(viewModel.formData);
  } catch (error) {
    console.error("初始化表單失敗:", error);
  }
});

const editWantSkills = ref<Record<string, number>>({});

const onUpdateWantSkills = (skills: Record<string, number>) => {
  editWantSkills.value = skills;
};

const editSkills = ref<Record<string, number>>({});

const onUpdateSkills = (skills: Record<string, number>) => {
  editSkills.value = skills;
};
</script>

<template>
  <div class="profileContainer">
    <div class="AvatarInputContainer">
      <!-- 隱藏的檔案輸入框 -->
      <input
        type="file"
        ref="fileInput"
        accept="image/jpeg, image/png, image/gif"
        @change="viewModel.handleFileChange"
        class="hidden"
      />

      <!-- 頭像上傳區域 -->
      <MainButton
        :onPress="viewModel.triggerFileInput"
        :needOpacity="false"
        class="marginB"
      >
        <div class="avatar-wrapper">
          <Avatar :imgurl="viewModel.formData.image" :size="'180px'" />

          <div class="camera-overlay">
            <i :style="{ paddingBottom: '8px' }" class="fa-solid fa-camera"></i>
            <p :style="{ fontSize: '14px' }">選擇圖片</p>
          </div>
        </div>
      </MainButton>
    </div>

    <div class="profileInputContainer">
      <h1 class="text-2xl font-bold">編輯個人資料</h1>

      <!-- 名稱 -->
      <input
        placeholder="名稱"
        class="textInput marginB"
        v-model="viewModel.formData.name"
      />
      <!-- 職業 -->
      <input
        placeholder="職業"
        class="textInput marginB"
        v-model="viewModel.formData.job"
      />

      <!-- 自我介紹 -->
      <textarea
        v-model="viewModel.formData.introduction"
        placeholder="自我介紹"
        rows="4"
        cols="50"
      ></textarea>

      <!-- 技能 -->
      <p>能教的技能</p>
      <SkillBarSelect
        @update="onUpdateSkills"
        :selectedSkills="viewModel.formData?.skills"
      />
      <!-- <p>父組件接收到的技能等級:</p>
      <pre>{{ editSkills }}</pre> -->

      <p>想學的技能</p>

      <SkillBarSelect
        @update="onUpdateWantSkills"
        :selectedSkills="viewModel.formData?.wantSkills"
      />
      <!-- <p>父組件接收到的技能等級:</p>
      <pre>{{ editWantSkills }}</pre> -->

      <div class="flex gap-4">
        <!-- 自定義上傳按鈕 -->
        <MainButton
          :onPress="viewModel.handleCancel"
          text="返回"
          class="marginB"
        ></MainButton>

        <MainButton
          :onPress="viewModel.updateProfile"
          text="更新"
          class="marginB"
        ></MainButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profileContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.AvatarInputContainer {
  padding-right: 80px;
  display: flex;
  flex-direction: column;
}

.profileInputContainer {
  width: 400px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.camera-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 32px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.avatar-wrapper:hover .camera-overlay {
  opacity: 1;
}
</style>
