<script setup lang="ts">
import { onMounted } from 'vue';
import { userDataStore } from './global/user_data';
import { GlobalData } from './global/global_data';
import { ref } from 'vue';
import { ModalController } from './components/utilities/BaseModal/ModalController';
import phoneHintModal from '../src/components/utilities/BaseModal/phoneHintModal.vue';

const isInit= ref<boolean>(false);

const phoneWidth: number = 490; // 預設手機視窗寬度

const isShowModal = ref<boolean>(false);
const modalController = new ModalController();

onMounted(async () => {
  // 從 localStorage 初始化用戶資料
  userDataStore.initializeFromLocalStorage();
  /// 取得全域資料
  await GlobalData.init();
  
  /// 視窗大小並 判斷是否要顯示 “下載App彈窗”（監聽）
  window.addEventListener('resize', updateScreenWidth);
  /// 初次判斷
  showPhoneDownloadHint(window.innerWidth);

  isInit.value = true;
});


 /// 視窗大小並 判斷是否要顯示 “下載App彈窗”（監聽）
const updateScreenWidth = () => {
  showPhoneDownloadHint(window.innerWidth);
};

/**
 * 控制跳出APP下載視窗
 * @param windowWidth 視窗寬度
 */
const showPhoneDownloadHint = (windowWidth: number) =>{
  if(windowWidth < phoneWidth){
    if(!isShowModal.value){
      modalController.show(phoneHintModal, {}, false, "rgba(0, 0, 0, 0.9)");
      isShowModal.value = true;
    }
  } else {
    if(isShowModal.value){
      modalController.close();
      isShowModal.value = false;
    }
  }
}

</script>

<template>
  <router-view v-if="isInit" name="aside"></router-view>
  <router-view v-if="isInit"></router-view>
</template>

<style>
@import '../src/assets/css/base.css';

</style>
