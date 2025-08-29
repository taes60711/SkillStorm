<template>
  <div class="hint_Container">
    <p class="textTitle">提示</p>
    <p class="textContianer">{{ props.modalProps.modalText }}</p>

    <div class="btnContainer">
      <MainButton
        :onPress="
          () => {
            props.modalProps.cancelFunc();
          }
        "
        :style="{ padding: '5px 20px' }"
        text="取消"
      >
      </MainButton>
      <MainButton
        :onPress="
          () => {
            props.modalProps.confirmFunc();
          }
        "
        :style="{ padding: '5px 20px' }"
        text="確認"
      >
      </MainButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";

const props = defineProps<{
  modalProps: object;
}>();
</script>

<style scoped>
.hint_Container {
  background-color: rgb(56, 54, 54);
  padding: 13px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  border-radius: 10px;
}

.textTitle {
  font-size: 25px;
  font-weight: 800;
  align-self: center;
}

.textContianer {
  padding: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btnContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
}
</style>
