<template>
  <BaseView
    :apiListFunc="viewModel.getProfileList"
    @apiReturnData="handleApiReturnData"
    :noLoadMoreData="true"
  >
    <template #apiListHeader>
      <div class="myPofileContainer">
        <!-- 頭像 -->
        <Avatar
          :imgurl="profileViewModel.profile.image"
          :size="'180px'"
        ></Avatar>
        <!-- 個人資料 -->

        <div class="myDataContainer">
          <div class="myProfileInfo">
            {{ profileViewModel.profile?.name }}

            <IconText
              icon="fa-solid fa-briefcase"
              :text="` ${profileViewModel.profile?.job}`"
              :size="'16px'"
              :style="{ padding: '0px 15px' }"
            ></IconText>

            <!-- 編輯按鈕 -->
            <MainButton :onPress="() => profileViewModel.toProfileEdit()">
              <i class="fa-solid fa-gear" :style="{ fontSize: '18px' }"></i>
            </MainButton>
          </div>

          <p class="introductionText">
            {{ profileViewModel.profile?.introduction }}
          </p>

          <p :style="{ marginBottom: '3px', fontSize: '14px' }">能教的技能</p>

          <div class="skillRow">
            <div
              v-for="skill in profileViewModel.profile?.skills"
              :key="skill.name"
            >
              <ProfileSkillBar :name="skill.name" :level="skill.level" />
            </div>
          </div>

          <p :style="{ margin: '3px 0px', fontSize: '14px' }">想學的技能</p>

          <div class="skillRow">
            <div
              v-for="skill in profileViewModel.profile?.wantSkills"
              :key="skill.name"
            >
              <ProfileSkillBar :name="skill.name" :level="skill.level" />
            </div>
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
              viewModel.toDetailPage(postData, item);
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
              :onPress="
                () => {
                  viewModel.deletePost(postData, item);
                }
              "
              :style="{ paddingRight: '16px' }"
            >
              <i class="fa-solid fa-trash fileDeleteBtn"></i>
            </MainButton>
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

            <MainButton
              :onPress="() => viewModel.sharePost(item)"
              :style="{ paddingRight: '16px' }"
            >
              <IconText
                icon="fa-solid fa-arrow-up-right-from-square"
                text="分享"
                class="bottombarItem"
              ></IconText>
            </MainButton>
          </div>
        </MainButton>
      </div>

      <MainButton
        v-if="postData.length !== 0"
        :onPress="() => profileViewModel.toMyPostPage()"
        class="moreBtn"
      >
        <p :style="{ marginRight: '7px' }">查看更多</p>
        <i class="fa-solid fa-circle-arrow-right"></i>
      </MainButton>
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
import ProfileViewModel from "@/view_models/profile/profile_view_model";
import ProfileSkillBar from "./ProfileSkillBar.vue";

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
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 30px 0px 0px 0px;
}

.myProfileInfo {
  display: flex;
  flex-direction: row;
}

.introductionText {
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(212, 210, 208);
}

.myDataContainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 20px;
  max-width: 398px;
}

.moreBtn {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.skillRow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
