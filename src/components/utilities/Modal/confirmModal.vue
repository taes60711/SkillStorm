<template>
  <div class="confirmModal_Container">
    <p v-if="props.modalProps.needTitile" class="textTitle">提示</p>
    <p class="textContianer">{{ props.modalProps.modalText }}</p>

    <MainButton
      :onPress="
        () => {
          props.modalProps.confirmFunc();
        }
      "
      text="確認"
      class="createButton"
    >
    </MainButton>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";

const props = defineProps<{
  modalProps: object;
}>();
</script>

<style scoped>
.confirmModal_Container {
  background-color: rgb(56, 54, 54);
  padding: 5px 20px;
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
  padding: 30px 30px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
