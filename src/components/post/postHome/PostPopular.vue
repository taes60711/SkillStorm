<template>
  <BaseView
    :apiListFunc="viewModel.getViewerPostList"
    @apiReturnData="handleApiReturnData"
  >
    <template #apiListHeader>
      <div class="postTab">
        <button
          @click="() => viewModel.changeHomePage('new')"
          class="postTabBtn"
        >
          最新
        </button>
        <button
          @click="() => viewModel.changeHomePage('popular')"
          class="choicePostTabBtn"
        >
          人氣
        </button>
      </div>

      <div class="postCreateContainer">
        <Avatar
          :imgurl="userDataStore.userData.value.image"
          size="40px"
          borderRadius="50px"
        />
        <MainButton
          :onPress="() => viewModel.createEditPage()"
          :textLeft="true"
          text="發佈新文章"
          class="postCreateBtn"
        ></MainButton>
      </div>
    </template>

    <template #apiListBody>
      <div
        class="postItemContainer"
        v-for="(item, index) in postData"
        v-bind:key="index"
      >
        <MainButton
          :needOpacity="false"
          :onPress="() => viewModel.toDetailPage(item)"
        >
          <div class="topBar">
            <div class="topUserBar">
              <Avatar
                :imgurl="item.user.image"
                size="40px"
                borderRadius="50px"
              />
              <p :style="{ paddingLeft: '10px' }">{{ item.user.name }}</p>
              <p :style="{ color: 'rgb(132, 131, 131)' }">
                •{{ dateTimeFormat.format(item.postTime) }}
              </p>
            </div>

            <MainButton :onPress="() => onChangePage('back')"> </MainButton>

            <MainButton
              :onPress="() => openItemSetting(item)"
              :style="{ paddingRight: '16px' }"
            >
              <i class="fa-solid fa-ellipsis"></i>
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

    <template #rightBody>
      <PostHomeBoard></PostHomeBoard>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";
import Avatar from "@/components/utilities/Avatar.vue";
import { userDataStore } from "@/global/user_data";
import PostHomeBoard from "./PostHomeBoard.vue";
import PostFile from "./PostFile.vue";
import { ref } from "vue";
import PostHomeViewModel from "@/view_models/post/post_home_view_model";
import BaseView from "@/components/utilities/BaseView.vue";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { DateFormatUtilities } from "@/global/date_time_format";
import IconText from "@/components/utilities/IconText.vue";

const dateTimeFormat = new DateFormatUtilities();
const viewModel = new PostHomeViewModel();
const postData = ref<Post[]>([]);

function openItemSetting(data: Post) {
  viewModel.editPage(postData.value, data);
}

function handleApiReturnData(data: Post[]) {
  postData.value.push(...data);
}
</script>

<style scoped>
.postTab {
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.156);
  border-radius: 25px;
  margin: 15px 0px;
}

.postTabBtn,
.choicePostTabBtn {
  width: 50%;
  height: 50px;
  border-radius: 25px;
}

.choicePostTabBtn {
  background-color: rgb(66, 66, 66);
}

.postTabBtn:hover {
  background-color: rgb(23, 23, 23);
}

.postCreateContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px 50px;
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
</style>
