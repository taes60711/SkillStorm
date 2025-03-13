<template>
  <div class="mark" :style="{ backgroundColor: props.markColor }">
    <div ref="baseModalMark" class="baseModalContainer">
      <component :is="modalContent" :modalProps="modalProps" />

      <i
        class="fa-solid fa-x baseModalCloseBtn"
        v-if="props.needCloseBtn"
        @click="props.closePage"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const baseModalMark = ref<HTMLDivElement | null>(null);
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
  needModalClose: {
    type: Boolean,
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

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (baseModalMark.value && !baseModalMark.value.contains(target)) {
    console.log("Clicked outside the modal!");
    document.removeEventListener("click", handleClickOutside);
    markClose();
  }
}

const markClose = (): void => {
  if (props.needModalClose) {
    props.closePage();
  }
};
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
  position: fixed;
  top: 0;
  right: 0;
  color: white;
  padding: 20px;
  font-size: 20px;
}
</style>
