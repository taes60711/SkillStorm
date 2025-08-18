<template>
  <div class="left"></div>

  <!-- InfoBar -->
  <div class="InfoBar_Container">
    <IconText
      class="InfoBar_Logo"
      v-if="viewModel.isShowText.value"
      :imgPath="AppImage.noTextLogo"
      :size="logoSize"
      text="SkillStorm"
    ></IconText>
    <img
      v-else-if="!viewModel.isShowText.value"
      :src="AppImage.noTextLogo"
      :style="{
        width: logoSize,
        height: logoSize
      }"
    />

    <div class="InfoBar_Message">
      <div v-for="item in viewModel.items" v-bind:key="viewModel.items">
        <div
          :class="
            viewModel.isChoicePagePath.value === item.path
              ? 'InfoBar_ItemBtnChoiced'
              : 'InfoBar_ItemBtn'
          "
          @click="viewModel.changePage(item.path)"
        >
          <IconText
            v-if="viewModel.isShowText.value"
            :icon="item.icon"
            :text="item.text"
          ></IconText>
          <i
            v-else-if="!viewModel.isShowText.value"
            :class="item.icon"
            :style="{ fontSize: '20px' }"
          ></i>
        </div>
      </div>

      <div
        v-if="userDataStore.isLogin() && viewModel.isShowText.value"
        :class="
          viewModel.isChoicePagePath.value ===
          RouterPath.HOME.PROFILE.INDEX.path
            ? 'InfoBar_MyItemBtnChoiced'
            : 'InfoBar_MyItemBtn'
        "
        @click="viewModel.changePage(RouterPath.HOME.PROFILE.INDEX.path)"
      >
        <IconText text="個人資料">
          <Avatar
            :imgurl="userDataStore.userData.value.image"
            size="40px"
            borderRadius="50px"
          />
        </IconText>
      </div>
      <div
        class=""
        v-else-if="userDataStore.isLogin() && !viewModel.isShowText.value"
        :class="
          viewModel.isChoicePagePath.value ===
          RouterPath.HOME.PROFILE.INDEX.path
            ? 'InfoBar_MyItemBtnChoiced'
            : 'InfoBar_MyItemBtn'
        "
        @click="viewModel.changePage(RouterPath.HOME.PROFILE.INDEX.path)"
      >
        <Avatar
          :imgurl="userDataStore.userData.value.image"
          size="30px"
          borderRadius="50px"
        />
      </div>
      <div v-else class="" @click="viewModel.goToLoginIn">
        <IconText
          v-if="viewModel.isShowText.value"
          class="InfoBar_MyItemBtn"
          icon="fa-solid fa-right-to-bracket"
          text="登入"
        ></IconText>
      </div>
    </div>

    <div class="InforBar_Setting">
      <div class="InfoBar_ItemBtn" @click="turOnOffSettingBar">
        <IconText
          v-if="viewModel.isShowText.value"
          icon="fa-solid fa-bars"
          text="更多"
        ></IconText>
        <i
          v-else-if="!viewModel.isShowText.value"
          class="fa-solid fa-bars"
          :style="{ fontSize: '30px' }"
        ></i>
      </div>
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
import Avatar from "@/components/utilities/Avatar.vue";
import IconText from "@/components/utilities/IconText.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { RouterPath } from "@/router/router_path";

const viewModel = new InfoBarViewModel();

const logoSize = ref<string>("40px");

onMounted(() => {
  viewModel.init();
});

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
.left {
  --width: 280px;
  padding: 0 20px;
}

.InforBar_Setting,
.InforBar_SettingBar {
  --height: 80px;
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
  padding-top: calc(var(--paddingTop) * 2);
}

.InforBar_SettingBar {
  width: 200px;
  bottom: calc(var(--height) - var(--paddingTop));
  left: var(--paddingLeft);
  border-radius: 10px;
  border: 0.5px solid rgba(248, 248, 248, 0.28);
  background-color: rgb(34, 34, 34);
  padding: 16px 16px;
  position: absolute;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.left {
  width: var(--width);
  height: 100%;
  flex-shrink: 0;
}

.InfoBar_Logo {
  padding: 15px 0px 0px 10px;
  font-weight: 800;
  font-size: 26px;
}

.InfoBar_ItemBtn,
.InfoBar_ItemBtnChoiced,
.InfoBar_MyItemBtn,
.InfoBar_MyItemBtnChoiced {
  padding: 10px 16px;
  border-radius: 32px;
  margin-bottom: 10px;
  display: flex;
  align-items: start;
  flex-direction: row;
  cursor: pointer;
}

.InfoBar_ItemBtnChoiced {
  background-color: rgb(48, 47, 47);
}

.InfoBar_ItemBtn:hover {
  background-color: rgb(27, 26, 26);
}

.InfoBar_MyItemBtn {
  margin-top: 10px;
  background-color: rgb(225, 147, 58);
}
.InfoBar_MyItemBtnChoiced {
  margin-top: 10px;
  background-color: rgb(48, 47, 47);
}

.InfoBar_MyItemBtn:hover {
  background-color: rgb(233, 174, 144);
}

@media screen and (max-width: 950px) {
  .InfoBar_Container,
  .left {
    --width: 100px;
    align-items: center;
  }

  .InfoBar_ItemBtn,
  .InfoBar_ItemBtnChoiced {
    padding: 12px;
    display: flex;
    justify-content: center;
  }

  .InfoBar_MyItemBtn,
  .InfoBar_MyItemBtnChoiced {
    padding: 12px;
    display: flex;
    justify-content: center;
  }

  .InforBar_SettingBar {
    width: 100px;
    left: 5px;
  }
}
</style>
