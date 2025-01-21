<script setup lang="ts">
import { userDataStore } from "@/global/user_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import ProfileViewModel from "@/view_models/profile/profile_view_model";

// 初始化 ViewModel
const viewModel = new ProfileViewModel();

</script>

<template>
  <div class="profile w-full" v-if="viewModel.profile">
    <div class="relative w-[120px]">
      <!-- 頭像 -->
      <div class="w-[120px] rounded-full overflow-hidden">
        <img
          :src="viewModel.avatarUrl"
          @error="viewModel.handleImageError"
          alt="User Avatar"
          class="cus-pic-auto"
        />
      </div>

      <!-- 編輯按鈕 -->
      <router-link
        :to="RouterPath.HOME.PROFILE.EDIT"
        class="absolute -bottom-1 -right-1 bg-gray-500 p-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        編輯
      </router-link>
    </div>

    <!-- 個人資料 -->
    <div class="mt-2 w-full">
      <h2 class="whitespace-normal break-words">
        {{ viewModel.profile?.name }}
      </h2>
      <div class="flex gap-2 items-center">
        <p>{{ viewModel.profile?.email }}</p>
        <p v-if="viewModel.profile?.isEmailVerified">已驗證</p>
        <p v-else>未驗證</p>
      </div>
      <p class="whitespace-normal break-words">
        {{ viewModel.profile?.introduction }}
      </p>
    </div>

    <div class="mt-2">
      <p>職業</p>
      <p>{{ viewModel.profile?.job }}</p>

      <p>能教的技能</p>
      <div class="flex gap-3">
        <div v-for="skill in viewModel.profile?.skills" :key="skill.name">
          {{ skill.level }} {{ skill.name }}
        </div>
      </div>

      <p>想學的技能</p>
      <div class="flex gap-3">
        <div v-for="skill in viewModel.profile?.wantSkills" :key="skill.name">
          {{ skill.level }} {{ skill.name }}
        </div>
      </div>
    </div>

    <!-- 更多功能 -->
    <div class="mt-2">
      <h3>更多功能</h3>
      <div class="w-full flex flex-col gap-2">
        <router-link :to="RouterPath.HOME.PROFILE.INDEX">我的文章</router-link>
        <router-link :to="RouterPath.HOME.PROFILE.INDEX">技術分享</router-link>
        <router-link :to="RouterPath.HOME.PROFILE.INDEX">一般</router-link>
        <router-link :to="RouterPath.HOME.PROFILE.INDEX">問題回報</router-link>
      </div>
    </div>


    <button @click="()=>{
      userDataStore.clearUser();
      router.push(RouterPath.AUTH.WELCOME);
     }">登出（暫時）</button>
     
    <!-- <pre class="mt-2">{{ viewModel.profile }}</pre> -->
  </div>
</template>

<style scoped>
.profile {
  color: #fff;
}
</style>
