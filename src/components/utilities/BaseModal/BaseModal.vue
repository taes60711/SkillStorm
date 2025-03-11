<template>
  <div class="mark" :style="{ backgroundColor: props.markColor }">
    <div class="baseModalContainer">
      <component :is="modalContent" :modalProps="modalProps" />

      <button
        v-if="props.needCloseBtn"
        class="baseModalCloseBtn"
        @click="props.closePage"
      >
        關閉
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 接收 Vue 组件作为 prop
const props = defineProps({
  modalContent: {
    type: Object,
    required: true,
  },
  modalProps: {
    type: Object,
    required: true,
  },
  needCloseBtn: {
    type: Boolean,
    required: true,
  },
  closePage: {
    type: Function,
    required: true,
  },
  markColor: {
    type: String,
    required: true,
  },
});
</script>

<style>
.mark {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(37, 37, 37, 0.902);
  display: flex;
  justify-content: center;
  align-items: center;
}

.baseModalContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.baseModalCloseBtn {
  background-color: rgb(57, 88, 88);
  padding: 3px 10px 3px 10px;
}
</style>
