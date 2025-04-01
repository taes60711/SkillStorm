<template>
  <div ref="apiList" class="apiList">
    <div class="mainBody">
      <div class="postbody">
        <slot name="midbody"></slot>
      </div>
    </div>

    <slot name="rightbody"></slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount } from "@vue/runtime-core";
import { onMounted } from "vue";
import { ref } from "vue";

const apiList = ref<HTMLElement>();

onMounted(() => {
  nextTick(() => {
    if (apiList.value) {
      console.log(
        `clientHeight: ${apiList.value.clientHeight} scrollHeight ${apiList.value.scrollHeight}`
      );

      apiList.value.addEventListener("scroll", handleScroll);
    }
  });
});

// 在組件卸載之前移除事件監聽器
onBeforeUnmount(() => {
  if (apiList.value) {
    apiList.value.removeEventListener("scroll", handleScroll);
  }
});

// 監聽滾動事件
const handleScroll = () => {
  const scrollTop = apiList.value?.scrollTop ?? 0;
  const scrollHeight = apiList.value?.scrollHeight ?? 0;
  const clientHeight = apiList.value?.clientHeight ?? 0;

  // 計算 scrollBottom
  const scrollBottom = scrollHeight - scrollTop - clientHeight;

  console.log("scrollTop:", scrollTop);
  console.log("scrollHeight:", scrollHeight);
  console.log("clientHeight:", clientHeight);
  console.log("scrollBottom:", scrollBottom);
};
</script>

<style scoped>
.apiList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  height: 100vh;
  overflow-y: scroll;
}

.mainBody {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.postbody {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 650px;
}
</style>
