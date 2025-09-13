<template>
  <BaseView
    :apiListFunc="viewModel.getBoardPostList(route.params.boardtype)"
    @apiReturnData="handleApiReturnData"
  >
    <template #apiListHeader>
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
          :onPress="() => viewModel.toDetailPage(postData, item)"
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
              :onPress="
                () => {
                  viewModel.deletePost(postData, item);
                }
              "
              :style="{ paddingRight: '16px' }"
              v-if="item.user.uid == userDataStore.userData.value.uid"
            >
              <i class="fa-solid fa-trash fileDeleteBtn"></i>
            </MainButton>
            <MainButton
              :onPress="() => openItemSetting(item)"
              :style="{ paddingRight: '16px' }"
              v-if="item.user.uid == userDataStore.userData.value.uid"
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

            <MainButton
              :onPress="
                () => {
                  viewModel.changeLike(postData, item);
                }
              "
            >
              <IconText
                v-if="item.userIsGood"
                icon="fa-solid fa-heart"
                :text="`${item.good}`"
                class="bottombarItem"
              ></IconText>
              <IconText
                v-else
                icon="fa-regular fa-heart"
                :text="`${item.good}`"
                class="bottombarItem"
              ></IconText>
            </MainButton>

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
    </template>

    <template #rightBody>
      <PostHomeBoard></PostHomeBoard>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import PostHomeViewModel from "@/view_models/post/post_home_view_model";
import BaseView from "../utilities/BaseView.vue";
import PostHomeBoard from "./postHome/PostHomeBoard.vue";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { ref } from "vue";
import { userDataStore } from "@/global/user_data";
import { DateFormatUtilities } from "@/global/date_time_format";
import IconText from "@/components/utilities/IconText.vue";
import MainButton from "@/components/utilities/MainButton.vue";
import Avatar from "@/components/utilities/Avatar.vue";
import PostFile from "./postHome/PostFile.vue";

const dateTimeFormat = new DateFormatUtilities();
const viewModel = new PostHomeViewModel();
const postData = ref<Post[]>([]);
const route = useRoute();

function openItemSetting(data: Post) {
  viewModel.editPage(postData.value, data);
}

function handleApiReturnData(data: Post[]) {
  postData.value.push(...data);
}

onMounted(() => {
  console.log(route.params.boardtype);
});
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
</style>
