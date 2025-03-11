<template>
  <div class="left"></div>

  <!-- InfoBar -->
  <div class="InfoBar_Container">
    <img
      :src="AppImage.noTextLogo"
      alt="SkillStorm"
      class="w-[65px] h-[60px]"
    />

    <div class="InfoBar_Message">
      <button :class="buttonStyle('bg-blue-500')" @click="goToPost">
        主頁
      </button>
      <button :class="buttonStyle('bg-blue-500')" @click="goToSuggestUser">
        技能交換
      </button>

      <button :class="buttonStyle('bg-blue-500')" @click="goToCourse">
        技術分享
      </button>
      <button :class="buttonStyle('bg-blue-500')" @click="goToMessage">
        訊息
      </button>

      <button :class="buttonStyle('bg-red-500')" @click="goToProfile">
        <span v-if="userDataStore.isLogin()">個人資料</span>
        <span v-else>登入</span>
      </button>
    </div>

    <div class="InforBar_Setting">
      <button @click="turOnOffSettingBar">
        <i class="fa-solid fa-bars" :style="{ fontSize: '30px' }"></i>
      </button>
    </div>

    <div
      v-if="settingBarIsOpen"
      id="InforBar_SettingBar"
      class="InforBar_SettingBar"
    >
      <button
        v-if="userDataStore.isLogin()"
        :class="buttonStyle('bg-yellow-500')"
        @click="logout"
      >
        登出
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import { userDataStore } from "@/global/user_data";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import { ref } from "vue";

const settingBarIsOpen = ref<boolean>(false);

function buttonStyle(style: string) {
  return `${style} pt-[5px] pb-[5px] pr-[10px] pl-[10px] m-[5px]`;
}

///登出
const logout = () => {
  if (userDataStore.isLogin()) {
    userDataStore.clearUser();
    router.push(RouterPath.HOME.POST.HOME);
  }
};

///跳至文章頁面
const goToPost = () => {
  router.push(RouterPath.HOME.POST.HOME);
};

///跳至文章頁面
const goToSuggestUser = () => {
  router.push(RouterPath.HOME.SUGGESTUSERS.HOME);
};

///跳至技術分享頁面
const goToCourse = () => {
  router.push(RouterPath.HOME.COURSE.HOME);
};

///跳至個人資料編輯頁面
const goToProfile = () => {
  if (userDataStore.isLogin()) {
    router.push(RouterPath.HOME.PROFILE.INDEX);
  } else {
    router.push(RouterPath.AUTH.LOGIN);
  }
};

///跳至訊息
const goToMessage = () => {
  console.log("先引導至App");
};

///開關 Bar
const turOnOffSettingBar = () => {
  settingBarIsOpen.value = !settingBarIsOpen.value;
  console.log(`turOnOffSettingBar ${settingBarIsOpen.value}`);

  if (settingBarIsOpen.value) {
    let settingBar: HTMLElement | null = null;

    setTimeout(() => {
      settingBar = document.getElementById("InforBar_SettingBar");
    }, 100);

    document.addEventListener("click", handleClick);

    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      if (settingBar && !settingBar.contains(target)) {
        settingBarIsOpen.value = false;
        document.removeEventListener("click", handleClick);
      }
    }
  }
};
</script>

<style scoped>
.InfoBar_Container,
.left {
  --width: 240px;
}

.InforBar_Setting,
.InforBar_SettingBar {
  --height: 80px;
  --paddingLeft: 20px;
  --paddingTop: 10px;
}

.InfoBar_Container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--width);
  background-color: red;
  display: flex;
  flex-direction: column;
}

.InfoBar_Message {
  width: 100%;
  flex-grow: 1;
  background-color: blue;
  display: flex;
  flex-direction: column;
}

.InforBar_Setting {
  width: 100%;
  height: var(--height);
  padding-left: var(--paddingLeft);
  padding-top: calc(var(--paddingTop) * 2);
  background-color: rgb(62, 62, 129);
}

.InforBar_SettingBar {
  width: 200px;
  height: 80px;
  bottom: calc(var(--height) - var(--paddingTop));
  left: var(--paddingLeft);
  background-color: rgb(206, 206, 225);
  position: absolute;
}

.left {
  width: var(--width);
  height: 100%;
  flex-shrink: 0;
  background-color: rgb(67, 71, 71);
}

@media screen and (max-width: 950px) {
  .InfoBar_Container,
  .left {
    --width: 100px;
  }
}
</style>
