<template>
  <div class="phoneHintModal_Container">
    <img
      :src="AppImage.noTextLogo"
      :style="{
        width: '200px',
        height: '200px',
      }"
    />
    <h1>請前往 App 下載體驗完整功能</h1>

    <p>我們的網站僅提供部分資訊，立即下載 App，享受更流暢的操作體驗！</p>

    <MainButton
      v-if="os === 'iOS'"
      class="downloadBtn"
      :onPress="() => toDonloadPage()"
      text=" 下載 iOS 版"
    >
    </MainButton>
    <MainButton
      v-else-if="os === 'Android'"
      class="downloadBtn"
      :onPress="() => toDonloadPage()"
      text="Android 版 請耐心等待"
    >
    </MainButton>

    <p v-else class="s">現在為網頁模式，請使用手機開啟該頁面</p>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import MainButton from "../MainButton.vue";

const os: string = getDeviceOS();

function toDonloadPage() {
  console.log(os);
  if (os === "iOS") {
    const iosStoreUrl: string =
      "https://apps.apple.com/tw/app/skillstorm/id6739574450";
    window.open(iosStoreUrl, "_blank");
    console.log("ios");
  } else if (os === "Android") {
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
</style>
