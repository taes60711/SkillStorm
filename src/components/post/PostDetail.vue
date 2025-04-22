<template>
  <div class="postDeatilContianer">
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

      <!-- <MainButton
        :onPress="() => openItemSetting()"
        :style="{ paddingRight: '16px' }"
      >
        <i class="fa-solid fa-ellipsis"></i>
      </MainButton> -->
    </div>

    <p>
      {{ props.modalProps.postData.mainMessage }}
    </p>

    <PostFile
      :fileMessage="props.modalProps.postData.fileMessage"
      :style="{ padding: '10px 0 10px 0' }"
    ></PostFile>
  </div>
</template>

<script setup lang="ts">
import { DateFormatUtilities } from "@/global/date_time_format";
import Avatar from "@/components/utilities/Avatar.vue";
import PostFile from "@/components/post/postHome/PostFile.vue";

const dateTimeFormat = new DateFormatUtilities();

const props = defineProps<{
  modalProps: object;
}>();
</script>

<style scoped>
.postDeatilContianer {
  background-color: rgb(49, 49, 50);
  width: 90vw;
  height: 96vh;
  max-width: 1100px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: 10px;
  padding: 20px 15px;
  color: white;
  border: 1px solid rgb(75, 75, 76);
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
</style>
