<template>
  <div class="left"></div>

  <!-- InfoBar -->
  <div class="InfoBar_Container">
    <div class="InfoBar_Logo">
      <img :src="AppImage.noTextLogo" class="w-[65px] h-[60px]" />
      <p class="InfoBar_Text">SkillStorm</p>
    </div>

    <div class="InfoBar_Message">
      <button class="InfoBar_ItemBtn" @click="viewModel.goToPost">
        <i class="fa-solid fa-house"></i>
        主頁
      </button>
      <button class="InfoBar_ItemBtn" @click="viewModel.goToSuggestUser">
        <i class="fa-solid fa-handshake-angle"></i>
        技能交換
      </button>

      <button class="InfoBar_ItemBtn" @click="viewModel.goToCourse">
        <i class="fa-solid fa-book-open-reader"></i>
        技術分享
      </button>
      <button class="InfoBar_ItemBtn" @click="viewModel.goToMessage">
        <i class="fa-solid fa-comments"></i>
        訊息
      </button>

      <button class="InfoBar_MyItemBtn" @click="viewModel.goToProfile">
        <span v-if="userDataStore.isLogin()">個人資料</span>
        <span v-else>登入</span>
      </button>
    </div>

    <div class="InforBar_Setting">
      <button @click="turOnOffSettingBar">
        <i class="fa-solid fa-bars" :style="{ fontSize: '30px' }"></i>
        更多
      </button>
    </div>

    <div
      v-if="viewModel.settingBarIsOpen.value"
      id="InforBar_SettingBar"
      class="InforBar_SettingBar"
    >
      <button v-if="userDataStore.isLogin()" @click="">我的文章</button>
      <button v-if="userDataStore.isLogin()" @click="">技術分享</button>
      <button @click="">一般</button>
      <button v-if="userDataStore.isLogin()" @click="viewModel.logout">
        登出
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import { userDataStore } from "@/global/user_data";
import InfoBarViewModel from "@/view_models/info_bar_view_model";

const viewModel = new InfoBarViewModel();

///開關 Bar
const turOnOffSettingBar = () => {
  viewModel.settingBarIsOpen.value = !viewModel.settingBarIsOpen.value;
  console.log(`turOnOffSettingBar ${viewModel.settingBarIsOpen.value}`);

  if (viewModel.settingBarIsOpen.value) {
    let settingBar: HTMLElement | null = null;

    setTimeout(() => {
      settingBar = document.getElementById("InforBar_SettingBar");
    }, 100);

    document.addEventListener("click", handleClick);

    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      if (settingBar && !settingBar.contains(target)) {
        viewModel.settingBarIsOpen.value = false;
        document.removeEventListener("click", handleClick);
      }
    }
  }
};
</script>

<style scoped>
.InfoBar_Container,
.InfoBar_Logo,
.left {
  --width: 280px;
  padding: 0 20px;
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
  display: flex;
  flex-direction: column;
  border-right: 0.6px solid rgb(84, 82, 82);
}

.InfoBar_Logo {
  width: var(--width);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 22px;
  font-weight: 800;
}

.InfoBar_Message {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
}

.InforBar_Setting {
  width: 100%;
  height: var(--height);
  padding-left: var(--paddingLeft);
  padding-top: calc(var(--paddingTop) * 2);
}

.InforBar_SettingBar {
  width: 200px;
  bottom: calc(var(--height) - var(--paddingTop));
  left: var(--paddingLeft);
  border-radius: 10px;
  border: 0.5px solid rgba(248, 248, 248, 0.28);
  padding: 16px 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.left {
  width: var(--width);
  height: 100%;
  flex-shrink: 0;
}

.InfoBar_ItemBtn,
.InfoBar_MyItemBtn {
  margin: 10px 10px 0 10px;
  padding: 12px 20px;
  border-radius: 32px;
  display: flex;
  align-items: start;
}

.InfoBar_ItemBtn:hover {
  background-color: rgb(27, 26, 26);
}

.InfoBar_MyItemBtn {
  margin-top: 20px;
  background-color: rgb(225, 147, 58);
}

.InfoBar_MyItemBtn:hover {
  background-color: rgb(233, 174, 144);
}

@media screen and (max-width: 950px) {
  .InfoBar_Container,
  .left {
    --width: 100px;
  }

  .InfoBar_Text {
    display: none;
  }
}
</style>
