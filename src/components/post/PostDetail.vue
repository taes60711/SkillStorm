<template>
  <BaseView
    :apiListFunc="viewModel.getPostComment(props.modalProps.postData.id)"
    @apiReturnData="handleApiReturnData"
    class="postDeatilContianer"
  >
    <template #apiListHeader>
      <div class="postItemContianer">
        <div class="topBar">
          <div class="topUserBar">
            <Avatar
              :imgurl="props.modalProps.postData.user.image"
              size="40px"
              borderRadius="50px"
            />
            <p :style="{ paddingLeft: '10px' }">
              {{ props.modalProps.postData.user.name }}
            </p>
            <p :style="{ color: 'rgb(132, 131, 131)' }">
              •{{ dateTimeFormat.format(props.modalProps.postData.postTime) }}
            </p>
          </div>
        </div>

        <p>
          {{ props.modalProps.postData.mainMessage }}
        </p>

        <PostFile
          :fileMessage="props.modalProps.postData.fileMessage"
          :style="{ padding: '10px 0 10px 0' }"
        ></PostFile>

        <div class="bottomBar">
          <IconText
            :icon="props.modalProps.postData.type.iconData"
            :text="props.modalProps.postData.type.chineseName"
            class="bottombarItem"
          ></IconText>

          <IconText
            v-if="props.modalProps.postData.userIsGood"
            icon="fa-regular fa-heart"
            :text="`${props.modalProps.postData.good}`"
            class="bottombarItem"
          ></IconText>
          <IconText
            v-else
            icon="fa-solid fa-heart"
            :text="`${props.modalProps.postData.good}`"
            class="bottombarItem"
          ></IconText>

          <IconText
            icon="fa-regular fa-comment"
            :text="`${props.modalProps.postData.count}`"
            class="bottombarItem"
          ></IconText>

          <IconText
            icon="fa-solid fa-arrow-up-right-from-square"
            text="分享"
            class="bottombarItem"
          ></IconText>
        </div>

        <div class="postCommentBar">
          <Avatar
          :imgurl="userDataStore.userData.value.image"
          size="40px"
          borderRadius="50px"
          />
          <input type="text" placeholder="輸入文字..." class="postComment"/>
            <MainButton
              :onPress="() => {}"
              :style="{ paddingRight: '16px' }"
            >
              <i  class="fa-solid fa-paper-plane postCommentSendBtn"></i>
            </MainButton>
        </div>
      </div>
    </template>

    <template #apiListBody>
      <div class="postCommentContainer" v-for="(item, index) in postCommentData" v-bind:key="index">
        <div class="topUserBar">
          <Avatar :imgurl="item.user.image" size="40px" borderRadius="50px" />
          <p :style="{ paddingLeft: '10px' }">
          
            <p :style="{ color: 'rgb(132, 131, 131)' }">
              {{ item.user.name }}
              •{{ dateTimeFormat.format(item.postTime) }}
            </p>  
            {{ item.message }}
           
          </p>
        </div>
      </div>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import { DateFormatUtilities } from "@/global/date_time_format";
import Avatar from "@/components/utilities/Avatar.vue";
import PostFile from "@/components/post/postHome/PostFile.vue";
import IconText from "@/components/utilities/IconText.vue";
import type { PostComment } from "@/models/reponse/post/post_comment_reponse_data";
import { ref } from "vue";
import { userDataStore } from "@/global/user_data";
import PostHomeViewModel from "@/view_models/post/post_home_view_model";
import BaseView from "@/components/utilities/BaseView.vue";

const dateTimeFormat = new DateFormatUtilities();
const postCommentData = ref<PostComment[]>([]);
const viewModel = new PostHomeViewModel();

const props = defineProps<{
  modalProps: object;
}>();

function handleApiReturnData(data: PostComment[]) {
  postCommentData.value.push(...data);
}
</script>

<style scoped>
.postDeatilContianer {
  background-color: rgb(49, 49, 50);
  width: 90vw;
  height: 96vh;
  max-width: 750px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
}

.postItemContianer {
  padding: 20px 0px;
}

.postDeatilContianer .topBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.postDeatilContianer .topUserBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
}

.postDeatilContianer .bottombarItem {
  padding-right: 13px;
}

.postDeatilContianer .bottomBar {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
}

.postDeatilContianer .postCommentBar{
  width: 100%;
  align-items: center;
  display: flex;
  margin: 15px 0px;
}

.postDeatilContianer .postItemContianer .postCommentBar  .postComment{
  display: flex;
  flex-grow: 1;
  padding: 6px 0px;
  margin: 0px 10px;
  background-color: rgba(255, 255, 255, 0);
  color: white !important;
  caret-color: white ;
  border: none;      
  outline: none;         
}


.postDeatilContianer .postCommentSendBtn{
  background-color: rgb(63, 64, 64);
  padding: 10px 20px;
  border-radius: 10px;
}

.postDeatilContianer .postCommentContainer {
  width: 100%;
  padding-bottom: 15px;
}

</style>
