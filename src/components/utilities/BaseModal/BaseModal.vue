

<template>
    <div class="mark">
        <div class="baseModalContainer">
            <!-- 使用 <component :is="modalContent" /> 动态渲染传递的组件 -->
            <component :is="modalContent" />

            <button class="baseModalCloseBtn" @click="props.closePage">
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
    closePage: {
      type: Function,
      required: true,
    },
  });

</script>

<style>

.mark{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(36, 37, 36, 0.421);
    display: flex;
    justify-content: center;
    align-items: center;
}

.baseModalContainer{
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 10px 5px 10px;
}

.baseModalCloseBtn{
  background-color: rgb(57, 88, 88);
  padding: 3px 10px 3px 10px;
}

</style>
