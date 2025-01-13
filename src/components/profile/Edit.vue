<script setup lang="ts">
import { onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import EditProfileViewModel from "@/view_models/profile/edit_view_model";

const viewModel = new EditProfileViewModel();

// 路由守衛只負責調用 ViewModel 的方法
onBeforeRouteLeave((to, from, next) => {
  viewModel.setupRouteGuard((canLeave) => {
    next(canLeave);
  });
});

onMounted(async () => {
  try {
    const uid = "tzLaMcP3V9XOAMOcD0FAY5Nf4tE2";
    await viewModel.initializeForm(uid);
  } catch (error) {
    console.error("初始化表單失敗:", error);
  }
});
</script>

<template>
  <div class="text-white">
    <div v-if="!viewModel.loading" class="">
      <!-- 頂部導航 -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">編輯個人資料</h1>
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

      <!-- 錯誤提示 -->
      <div v-if="viewModel.error" class="text-red-500">
        {{ viewModel.error }}
      </div>

      <!-- 編輯區域 -->
      <!-- 頭像上傳區域 -->
      <div>
        <div class="text-gray-400 text-sm mb-2">頭像</div>

        <div class="">
          <img
            v-if="viewModel.formData.image && !viewModel.imageLoadError"
            :src="viewModel.formData.image"
            @error="viewModel.handleImageError"
            alt="用戶頭像"
            class="w-32 h-32 rounded-full object-cover"
          />
        </div>

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
      </div>

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
        <div class="flex gap-3">
          <div v-for="skill in viewModel.formData?.skills" :key="skill.name">
            {{ skill.level }} {{ skill.name }}
          </div>
        </div>

        <p>想學的技能</p>
        <div class="flex gap-3">
          <div
            v-for="skill in viewModel.formData?.wantSkills"
            :key="skill.name"
          >
            {{ skill.level }} {{ skill.name }}
          </div>
        </div>
      </div>

      <!-- 調試信息 -->
      <!-- <pre class="text-xs text-gray-500">{{ viewModel.formData }}</pre> -->
    </div>
    <div v-else class="text-center py-8">
      載入中... ({{ viewModel.loading }})
    </div>
  </div>
</template>
