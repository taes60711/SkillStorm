<template>
  <div class="phoneHintModal_Container">
    <img
      :src="AppImage.noTextLogo"
      :style="{
        width: '200px',
        height: '200px'
      }"
    />
    <h1>請前往 App 下載體驗完整功能</h1>

    <p>我們的網站僅提供部分資訊，立即下載 App，享受更流暢的操作體驗！</p>

    <MainButton
      v-if="os === 'iOS'"
      class="downloadBtn"
      :onPress="() => toDonloadPage()"
      text="下載 iOS 版"
    >
    </MainButton>
    <MainButton
      v-else-if="os === 'Android'"
      class="downloadBtn"
      :onPress="() => toDonloadPage()"
      text="下載 Android 版"
    >
    </MainButton>

    <div v-else class="qrCode">
      <div class="qrCodeContainer">
        <qrcode-vue :value="iosStoreUrl" :size="100" />

        <MainButton
          class="downloadBtn BtnMargin"
          :onPress="() => toDonloadPage()"
          text="iOS"
        >
        </MainButton>
      </div>
      <div class="qrCodeContainer">
        <qrcode-vue :value="androidStoreUrl" :size="100" />
        <MainButton
          class="downloadBtn BtnMargin"
          :onPress="() => toDonloadPage()"
          text="Android"
        >
        </MainButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import MainButton from "../MainButton.vue";
import QrcodeVue from "qrcode.vue";

const os: string = getDeviceOS();
const iosStoreUrl: string =
  "https://apps.apple.com/tw/app/skillstorm/id6739574450";

const androidStoreUrl: string = "";

function toDonloadPage() {
  console.log(os);
  if (os === "iOS") {
    window.open(iosStoreUrl, "_blank");
    console.log("ios");
  } else if (os === "Android") {
    window.open(androidStoreUrl, "_blank");
    console.log("android");
  }
}

function getDeviceOS(): string {
  const userAgent = navigator.userAgent;

  // 判斷 iOS 裝置
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "iOS";
  }

  // 判斷 Android 裝置
  if (/Android/.test(userAgent)) {
    return "Android";
  }

  return "Other"; // 其他設備
}
</script>

<style scoped>
.phoneHintModal_Container {
  background-color: rgb(60, 58, 58);
  padding: 20px 0;
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

.phoneHintModal_Container h1 {
  font-weight: bold;
  font-size: x-large;
  color: rgb(235, 134, 39);
}

.phoneHintModal_Container p {
  color: rgb(218, 218, 218);
  padding: 15px 0;
}

.downloadBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  font-weight: 700;
}
.BtnMargin {
  margin-bottom: 5px;
  margin-top: 5px;
}

.qrCode {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.qrCodeContainer {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
