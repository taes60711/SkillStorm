<template>
  <div class="ShareModal_Container">
    <h1>分享</h1>

    <qrcode-vue :value="shareUrl" :size="200" />

    <div class="ShareModal_Url">
      <p>{{ shareUrl }}</p>
      <MainButton class="BtnMargin" :onPress="() => copyUrl()">
        <i class="fa-solid fa-copy" :style="{ paddingLeft: '10px' }"></i>
      </MainButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIHttpController } from "@/global/api_http_controller";
import { onBeforeMount } from "@vue/runtime-core";
import MainButton from "../MainButton.vue";
import QrcodeVue from "qrcode.vue";

let shareUrl: string = "";

const props = defineProps<{
  modalProps: object;
}>();

onBeforeMount(() => {
  shareUrl = `${APIHttpController.prefixUrl}:/${APIHttpController.domainUrl}${props.modalProps.shareUrl}`;
});

async function copyUrl() {
  await navigator.clipboard.writeText(shareUrl);
  console.log("copy Success");
}
</script>

<style scoped>
.ShareModal_Container {
  background-color: rgb(60, 58, 58);
  margin: 20px;
  border-radius: 10px;
  max-width: 400px;
  padding: 20px;
  border: 0.5px rgb(100, 100, 100) solid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ShareModal_Container h1 {
  font-weight: bold;
  font-size: x-large;
  color: white;
  padding-bottom: 10px;
}

.ShareModal_Url {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  color: white;
}
</style>
