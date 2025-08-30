<script setup lang="ts">
import { onBeforeRouteLeave } from "vue-router";
import EditProfileViewModel from "@/view_models/profile/edit_view_model";
import SkillBarSelect from "./SkillBarSelect.vue";
import { onBeforeMount, ref } from "@vue/runtime-core";
import Avatar from "@/components/utilities/Avatar.vue";

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
  <div class="text-white">
    <div v-if="!viewModel.loading" class="">
      <!-- 頂部導航 -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">編輯個人資料</h1>
      </div>

      <!-- 錯誤提示 -->
      <div v-if="viewModel.error" class="text-red-500">
        {{ viewModel.error }}
      </div>

      <!-- 編輯區域 -->
      <!-- 頭像上傳區域 -->
      <Avatar :imgurl="viewModel.formData.image"></Avatar>

      <!-- 隱藏的檔案輸入框 -->
      <input
        type="file"
        ref="fileInput"
        accept="image/jpeg, image/png, image/gif"
        @change="viewModel.handleFileChange"
        class="hidden"
      />

      <!-- 自定義上傳按鈕 -->
      <button
        @click="viewModel.triggerFileInput"
        class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        選擇圖片
      </button>

      <div class="">
        <!-- 名稱 -->
        <div>
          <div class="text-gray-400 text-sm mb-2">名稱</div>
          <input v-model="viewModel.formData.name" type="text" class="" />
        </div>

        <!-- 職業 -->
        <div>
          <div class="text-gray-400 text-sm mb-2">職業</div>
          <input v-model="viewModel.formData.job" type="text" class="" />
        </div>

        <!-- 自我介紹 -->
        <div>
          <div class="text-gray-400 text-sm mb-2">自我介紹</div>
          <textarea
            v-model="viewModel.formData.introduction"
            rows="4"
            class="resize-none"
          ></textarea>
        </div>

        <!-- 技能 -->
        <p>能教的技能</p>

        <SkillBarSelect
          @update="onUpdateSkills"
          :selectedSkills="viewModel.formData?.skills"
        />
        <p>父組件接收到的技能等級:</p>
        <pre>{{ editSkills }}</pre>

        <p>想學的技能</p>

        <SkillBarSelect
          @update="onUpdateWantSkills"
          :selectedSkills="viewModel.formData?.wantSkills"
        />
        <p>父組件接收到的技能等級:</p>
        <pre>{{ editWantSkills }}</pre>
      </div>

      <div class="flex gap-4">
        <button
          @click="viewModel.handleCancel"
          class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          返回
        </button>
        <button
          @click="viewModel.updateProfile"
          :disabled="!viewModel.hasChanges"
          class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {{ viewModel.loading ? "更新中..." : "更新" }}
        </button>
      </div>
    </div>
  </div>
</template>
