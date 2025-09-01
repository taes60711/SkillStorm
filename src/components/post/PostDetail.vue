<template>
  <BaseView
    :apiListFunc="viewModel.getPostComment()"
    @apiReturnData="viewModel.handleApiCommentReturnData"
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

        <div class="postCommentBar" ref="commentBar">
          <Avatar
            :imgurl="userDataStore.userData.value.image"
            size="40px"
            borderRadius="50px"
          />
          <input type="text" placeholder="輸入文字..." v-model="viewModel.commentInput.value" class="postComment" />
          <MainButton
            :onPress="() => {
              if(viewModel.commentIsEdit.value) {
                viewModel.editPostCommentSend();
              } else {
                viewModel.createPostComment()
              }
             
            }"
          
          >
            <i class="fa-solid fa-paper-plane postCommentSendBtn"></i>
          </MainButton>
        </div>
      </div>
    </template>

    <template #apiListBody>

      <div v-if="viewModel.postCommentData.value.length === 0" 
        class="noDataContainer">
        <i class="fa-solid fa-comment-slash"></i>
        <p>目前還沒有任何留言</p>
      </div>

      <div v-else
        class="postCommentContainer"
        v-for="(item, index) in viewModel.postCommentData.value"
        v-bind:key="index"
      >
        <div class="topUserBar">
          <Avatar :imgurl="item.user.image" size="40px" borderRadius="50px" />
          <p :style="{ paddingLeft: '10px' }">
          
            <p :style="{ color: 'rgb(132, 131, 131)' }">
              {{ item.user.name }}
              •{{ dateTimeFormat.format(item.postTime) }}
            </p>  

     
            <div class="commentMessge">
              {{ item.message }}
            </div>
          </p>
        </div>

        <div class="editContainer" v-if="item.user.uid == userDataStore.userData.value.uid">
         <MainButton
            :onPress="() => {
              scrollToComment();
              viewModel.editPostCommentStart(item.id, item.message);
               
            }"
            :style="{ marginRight: '5px' }"
            text="編集"
            v-if="!viewModel.commentIsEdit.value" 
          ></MainButton>
          
          <MainButton
            :onPress="() => viewModel.deletePostComment(item.id)"
            text="刪除"
            v-if="!viewModel.commentIsEdit.value" 
          ></MainButton>
        </div>

      </div>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";
import { DateFormatUtilities } from "@/global/date_time_format";
import Avatar from "@/components/utilities/Avatar.vue";
import PostFile from "@/components/post/postHome/PostFile.vue";
import IconText from "@/components/utilities/IconText.vue";
import { userDataStore } from "@/global/user_data";
import BaseView from "@/components/utilities/BaseView.vue";
import postDetailViewModel from "@/view_models/post/post_detail_view_models";
import { onBeforeMount, ref } from "@vue/runtime-core";

const commentBar = ref<HTMLElement | null>(null);
const dateTimeFormat = new DateFormatUtilities();
const viewModel = new postDetailViewModel();
const props = defineProps<{
  modalProps: object;
}>();

onBeforeMount(() => {
  /// 導入文章Id
  viewModel.init(props.modalProps.postData.id);
});

const scrollToComment = () => {
   console.log("commentBar:", commentBar.value);
    commentBar.value?.scrollIntoView({ behavior: "smooth", block: "start" });


};


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
  margin: 20px 0px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

.postDeatilContianer .postCommentBar {
  width: 100%;
  align-items: center;
  display: flex;
  margin: 15px 0px;
  padding: 6px 15px;
  border-radius: 8px;
  background-color: rgb(39, 39, 39);
}

.postDeatilContianer .postItemContianer .postCommentBar .postComment {
  display: flex;
  flex-grow: 1;
  padding: 6px 0px;
  margin: 0px 10px;
  background-color: rgba(255, 255, 255, 0);
  color: white !important;
  caret-color: white;
  border: none;
  outline: none;
}

.postDeatilContianer .postCommentSendBtn {
  background-color: rgb(63, 64, 64);
  padding: 10px 20px;
  border-radius: 10px;
}

.postDeatilContianer .postCommentContainer {
  width: 100%;
  padding-bottom: 15px;
}

.postCommentContainer .editContainer{
  display: flex;
  flex-direction: row;
  padding-top: 10px;
}


</style>
