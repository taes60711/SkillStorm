<template>
  <BaseView :apiListFunc="getPostList" @apiReturnData="handleApiReturnData">
    <template #apiListHeader>
      <div class="postTab">
        <button
          @click="() => viewModel.changeHomePage('new')"
          :class="{
            choicePostTabBtn: viewModel.nowHomePage.value === 'new',
            postTabBtn: viewModel.nowHomePage.value !== 'new',
          }"
        >
          最新
        </button>
        <button
          @click="() => viewModel.changeHomePage('popular')"
          :class="{
            choicePostTabBtn: viewModel.nowHomePage.value === 'popular',
            postTabBtn: viewModel.nowHomePage.value !== 'popular',
          }"
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
        <div class="topBar">
          <Avatar :imgurl="item.user.image" size="40px" borderRadius="50px" />
          {{ item.user.name }}

          {{ dateTimeFormat.format(item.postTime) }}
          <i class="fa-solid fa-ellipsis"></i>
        </div>

        {{ item.mainMessage }}
        <PostFile
          :fileMessage="item.fileMessage"
          :style="{ padding: '10px 0 10px 0' }"
        ></PostFile>

        <div class="bottomBar">
          <IconText
            :icon="item.type.iconData"
            :text="item.type.chineseName"
          ></IconText>

          <IconText
            v-if="item.userIsGood"
            icon="fa-regular fa-heart"
            :text="`${item.good}`"
          ></IconText>
          <IconText
            v-else
            icon="fa-solid fa-heart"
            :text="`${item.good}`"
          ></IconText>

          <IconText
            icon="fa-regular fa-comment"
            :text="`${item.count}`"
          ></IconText>

          <IconText
            icon="fa-solid fa-arrow-up-right-from-square"
            text="分享"
          ></IconText>
        </div>
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
import PostService from "@/services/post_service";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { DateFormatUtilities } from "@/global/date_time_format";
import IconText from "@/components/utilities/IconText.vue";

const viewModel = new PostHomeViewModel();
const postData = ref<Post[]>([]);
const dateTimeFormat = new DateFormatUtilities();

function handleApiReturnData(data: Post[]) {
  postData.value.push(...data);
}

const getPostList: (page: number, size: number) => Promise<Post[]> = (
  page,
  size
) => {
  return new PostService().getPostByViewer(
    page,
    size,
    userDataStore.userData.value.uid
  );
};
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
  padding: 10px 0 10px 0;
}

.postItemContainer .topBar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.postItemContainer .bottomBar {
  display: flex;
  flex-direction: row;
}

.postCreateBtn {
  flex-grow: 1;
  display: flex;
  margin-left: 15px;
}
</style>
