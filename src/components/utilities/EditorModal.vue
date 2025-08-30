<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot></slot>

      <div class="btnContainer">
        <button @click="close" class="modal-close-btn">取消</button>
        <button @click="handleConfirm" class="modal-close-btn">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    confirmFunc: {
      type: Function
    }
  },

  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    handleConfirm() {
      if (this.confirmFunc) {
        this.confirmFunc();
      }
      this.close();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgb(51, 50, 50);
  padding: 10px 10px;
  border-radius: 8px;
}

.btnContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.modal-close-btn {
  background-color: rgb(44, 43, 43);
  padding: 5px 20px;
  margin: 0px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: white;
}
</style>
