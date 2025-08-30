<template>
  <BaseView
    :apiListFunc="viewModel.getMyPostList"
    @apiReturnData="handleApiReturnData"
  >
    <template #apiListHeader>
      <div class="myPofileContainer">
        <!-- 頭像 -->
        <Avatar :imgurl="profileViewModel.profile.image"></Avatar>
        <!-- 個人資料 -->
        <h2 class="whitespace-normal break-words">
          {{ profileViewModel.profile?.name }}
        </h2>

        <p>職業</p>
        <p>{{ profileViewModel.profile?.job }}</p>

        <p class="whitespace-normal break-words">
          {{ profileViewModel.profile?.introduction }}
        </p>
        <!-- 編輯按鈕 -->

        <MainButton class="marginB">
          <router-link :to="RouterPath.HOME.PROFILE.EDIT"> 編輯 </router-link>
        </MainButton>
      </div>

      <div class="mt-2">
        <p>能教的技能</p>
        <div class="flex gap-3">
          <div
            v-for="skill in profileViewModel.profile?.skills"
            :key="skill.name"
          >
            {{ skill.level }} {{ skill.name }}
          </div>
        </div>

        <p>想學的技能</p>
        <div class="flex gap-3">
          <div
            v-for="skill in profileViewModel.profile?.wantSkills"
            :key="skill.name"
          >
            {{ skill.level }} {{ skill.name }}
          </div>
        </div>
      </div>

      <!-- 我的文章 -->
    </template>
    <template #apiListBody>
      <div v-if="postData.length === 0" class="noDataContainer">
        <i class="fa-solid fa-newspaper"></i>
        <p>目前還沒有任何文章</p>
      </div>

      <div
        v-else
        class="postItemContainer"
        v-for="(item, index) in postData"
        v-bind:key="index"
      >
        <MainButton
          :needOpacity="false"
          :onPress="
            () => {
              item.user = userDataStore.user.value;
              viewModel.toDetailPage(item);
            }
          "
        >
          <div class="topBar">
            <div class="topUserBar">
              <Avatar
                :imgurl="userDataStore.userData.value.image"
                size="40px"
                borderRadius="50px"
              />
              <p :style="{ paddingLeft: '10px' }">
                {{ userDataStore.userData.value.name }}
              </p>
              <p :style="{ color: 'rgb(132, 131, 131)' }">
                •{{ dateTimeFormat.format(item.postTime) }}
              </p>
            </div>

            <MainButton :onPress="() => onChangePage('back')"> </MainButton>

            <MainButton
              :onPress="() => openItemSetting(item)"
              :style="{ paddingRight: '16px' }"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </MainButton>
          </div>

          <p class="MainMsg">
            {{ item.mainMessage }}
          </p>

          <PostFile
            :fileMessage="item.fileMessage"
            :style="{ padding: '10px 0 10px 0' }"
          ></PostFile>

          <div class="bottomBar">
            <IconText
              :icon="item.type.iconData"
              :text="item.type.chineseName"
              class="bottombarItem"
            ></IconText>

            <IconText
              v-if="item.userIsGood"
              icon="fa-regular fa-heart"
              :text="`${item.good}`"
              class="bottombarItem"
            ></IconText>
            <IconText
              v-else
              icon="fa-solid fa-heart"
              :text="`${item.good}`"
              class="bottombarItem"
            ></IconText>

            <IconText
              icon="fa-regular fa-comment"
              :text="`${item.count}`"
              class="bottombarItem"
            ></IconText>

            <IconText
              icon="fa-solid fa-arrow-up-right-from-square"
              text="分享"
              class="bottombarItem"
            ></IconText>
          </div>
        </MainButton>
      </div>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import PostHomeViewModel from "@/view_models/post/post_home_view_model";
import BaseView from "@/components/utilities/BaseView.vue";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { ref } from "vue";
import { DateFormatUtilities } from "@/global/date_time_format";
import IconText from "@/components/utilities/IconText.vue";
import MainButton from "@/components/utilities/MainButton.vue";
import Avatar from "@/components/utilities/Avatar.vue";
import PostFile from "@/components/post/postHome/PostFile.vue";
import { userDataStore } from "@/global/user_data";
import { RouterPath } from "@/router/router_path";
import ProfileViewModel from "@/view_models/profile/profile_view_model";

// 初始化 ViewModel
const profileViewModel = new ProfileViewModel();
const dateTimeFormat = new DateFormatUtilities();
const viewModel = new PostHomeViewModel();
const postData = ref<Post[]>([]);

function openItemSetting(data: Post) {
  data.user = userDataStore.userData.value;
  viewModel.editPage(postData.value, data);
}

function handleApiReturnData(data: Post[]) {
  postData.value.push(...data);
}
</script>

<style scoped>
.postCreateContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px 50px;
  margin-top: 20px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.156);
}

.postItemContainer {
  width: 100%;
  border-bottom: solid rgb(54, 53, 53) 1px;
  overflow-wrap: anywhere;
  padding: 15px 0px;
}

.postItemContainer .topBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.postItemContainer .topUserBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
}

.postItemContainer .bottomBar {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
}

.postItemContainer .MainMsg {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  overflow: hidden;
}

.bottombarItem {
  padding-right: 13px;
}

.postCreateBtn {
  flex-grow: 1;
  display: flex;
  margin-left: 15px;
}

.myPofileContainer {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}
</style>
