<template>
  <!-- 背景，點擊背景觸發 markClose -->
  <div
    class="mark"
    :style="{ backgroundColor: props.markColor }"
    @click="markClose"
  >
    <!-- Modal 主體，阻止冒泡，不會觸發背景的 markClose -->
    <div ref="baseModalMark" class="baseModalContainer" @click.stop>
      <component :is="modalContent" :modalProps="modalProps" />

      <i
        class="fa-solid fa-x baseModalCloseBtn"
        v-if="props.needCloseBtn"
        @click="closeModal"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modalContent: {
    type: Object,
    required: true
  },
  modalProps: {
    type: Object,
    required: true
  },
  needModalClose: {
    type: Boolean,
    required: true
  },
  needCloseBtn: {
    type: Boolean,
    required: true
  },
  closePage: {
    type: Function,
    required: true
  },
  markColor: {
    type: String,
    required: true
  }
});

const markClose = (): void => {
  if (props.needModalClose) {
    closeModal();
  }
};

const closeModal = () => {
  props.closePage();
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
  top: 0px;
  right: 15px;
  color: white;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>
