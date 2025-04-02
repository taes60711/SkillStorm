<template>
  <div ref="apiList" class="apiList">
    <div class="mainBody">
      <slot name="midbody"></slot>
    </div>

    <slot name="rightbody"></slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import { apiStatus } from "@/view_models/info_bar_view_model";
import { onBeforeUnmount, watch } from "@vue/runtime-core";
import { onMounted } from "vue";
import { ref } from "vue";

const apiList = ref<HTMLElement>();
const apiListPage = ref<number>(0);
const preloadList = ref<T[]>([]);

const apiLoadingStatus = ref<apiStatus>(apiStatus.loadingFinish);

const props = defineProps({
  apiFunc: {
    type: Function,
  },
  page: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits<{
  (event: "apiReturnData", data: {}): number[];
}>();

onMounted(async () => {
  if (apiList.value) {
    apiList.value.addEventListener("scroll", handleScroll);
    await firstLoadData();
  }
});

onBeforeUnmount(() => {
  if (apiList.value) {
    apiList.value.removeEventListener("scroll", handleScroll);
  }
});

const handleScroll = () => {
  const scrollTop = apiList.value?.scrollTop ?? 0;
  const scrollHeight = apiList.value?.scrollHeight ?? 0;
  const clientHeight = apiList.value?.clientHeight ?? 0;
  const scrollBottom = scrollHeight - scrollTop - clientHeight;

  if (apiLoadingStatus.value !== apiStatus.noDataCanLoad) {
    if (scrollBottom < 10) {
      if (apiLoadingStatus.value === apiStatus.loadingFinish) {
        insertLoadedData(preloadList.value as T[]);
      } else if (apiLoadingStatus.value === apiStatus.preDataLoading) {
        const stopWatch = watch(apiLoadingStatus, (newVal) => {
          if (newVal === apiStatus.loadingFinish) {
            insertLoadedData(preloadList.value as T[]);
            stopWatch();
          }
        });
      }
    }
  }
};

const firstLoadData = async () => {
  apiLoadingStatus.value = apiStatus.firstLoading;
  let loadedData: T[] = await props.apiFunc(apiListPage.value, props.size);
  await insertLoadedData(loadedData);
};

const insertLoadedData = async (loadedData: T[]) => {
  emit("apiReturnData", loadedData);
  await preloadData();
};

const preloadData = async () => {
  apiLoadingStatus.value = apiStatus.preDataLoading;

  let page: number = apiListPage.value + 1;
  apiListPage.value = page;

  let loadedData: T[] = await props.apiFunc(apiListPage.value, props.size);

  if (loadedData.length != 0) {
    preloadList.value = loadedData;
    apiLoadingStatus.value = apiStatus.loadingFinish;
  } else {
    apiLoadingStatus.value = apiStatus.noDataCanLoad;
  }
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
</style>
