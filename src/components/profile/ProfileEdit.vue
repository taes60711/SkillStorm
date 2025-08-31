<script setup lang="ts">
import EditProfileViewModel from "@/view_models/profile/edit_view_model";
import SkillBarSelect from "./SkillBarSelect.vue";
import { onBeforeMount } from "@vue/runtime-core";
import Avatar from "@/components/utilities/Avatar.vue";
import MainButton from "@/components/utilities/MainButton.vue";
import { EditTools } from "@/global/edit_tools";

const viewModel = new EditProfileViewModel();
const editTools = new EditTools();

onBeforeMount(() => {
  viewModel.initializeForm();
});
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
      <MainButton :onPress="editTools.triggerFileInput">
        <div class="avatar-wrapper">
          <Avatar :imgurl="viewModel.formData.value.image" :size="'180px'" />

          <div class="camera-overlay">
            <i :style="{ paddingBottom: '8px' }" class="fa-solid fa-camera"></i>
            <p :style="{ fontSize: '14px' }">選擇圖片</p>
          </div>
        </div>
      </MainButton>
    </div>

    <div class="profileInputContainer">
      <p class="pageTitle">編輯個人資料</p>

      <!-- 名稱 -->
      <input
        placeholder="名稱"
        class="textInput marginB"
        v-model="viewModel.formData.value.name"
      />
      <!-- 職業 -->
      <input
        placeholder="職業"
        class="textInput marginB"
        v-model="viewModel.formData.value.job"
      />

      <!-- 自我介紹 -->
      <textarea
        v-model="viewModel.formData.value.introduction"
        placeholder="自我介紹"
        rows="4"
        cols="50"
        class="marginB"
      ></textarea>

      <!-- 技能 -->
      <p>能教的技能</p>
      <SkillBarSelect
        @update="viewModel.onUpdateSkills"
        :selectedSkills="viewModel.formData.value.skills"
        class="marginB"
      />

      <p>想學的技能</p>

      <SkillBarSelect
        @update="viewModel.onUpdateWantSkills"
        :selectedSkills="viewModel.formData.value.wantSkills"
      />

      <div class="editButton">
        <!-- 自定義上傳按鈕 -->
        <MainButton
          :onPress="viewModel.handleCancel"
          text="返回"
          class="marginR"
        ></MainButton>

        <MainButton
          :onPress="
            () => {
              viewModel.updateProfile();
            }
          "
          text="更新"
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

.editButton {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.marginR {
  margin-right: 10px;
}

.marginB {
  margin-bottom: 10px;
}

.pageTitle {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
}
</style>
