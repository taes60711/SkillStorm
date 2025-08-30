<template>
  <div ref="apiList" class="apiList">
    <div class="mainBody">
      <!-- #1 api list  -->
      <div
        v-if="props.apiListFunc != null"
        class="postbody"
        :style="{ maxWidth: '650px' }"
      >
        <!-- api list header -->
        <slot name="apiListHeader"></slot>
        <div v-if="apiLoadingStatus === apiStatus.firstLoading">
          <div class="wrapper">
            <div class="circleWraper">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
            <span>Loading</span>
          </div>
        </div>

        <!-- api list body -->
        <slot v-else name="apiListBody"></slot>
      </div>
      <!-- #2 no api  -->
      <div v-else class="postbody" :style="{ maxWidth: '650px' }">
        <slot name="midBody"></slot>
      </div>
    </div>

    <slot name="rightBody"></slot>
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
  apiListFunc: {
    type: Function
  },
  page: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 5
  },
  noLoadMoreData: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (event: "apiReturnData", data: {}): T[];
}>();

onMounted(async () => {
  if (props.apiListFunc != null) {
    if (apiList.value) {
      apiList.value.addEventListener("scroll", handleScroll);
      await firstLoadData();
    }
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

  if (apiLoadingStatus.value === apiStatus.noDataCanLoad) {
    return;
  }

  if (scrollBottom < 10) {
    switch (apiLoadingStatus.value) {
      ///　預加載的資料已經Load完的情況
      /// 回傳資料
      case apiStatus.loadingFinish:
        insertLoadedData(preloadList.value as T[]);
        break;
      ///　還在Loading預加載的資料的情況
      /// 等preload的api執行完才執行資料回傳
      case apiStatus.preDataLoading:
        const stopWatch = watch(apiLoadingStatus, (newVal) => {
          if (newVal === apiStatus.loadingFinish) {
            insertLoadedData(preloadList.value as T[]);
            stopWatch();
          }
        });
        break;
    }
  }
};

/// 初次Loading
const firstLoadData = async () => {
  apiLoadingStatus.value = apiStatus.firstLoading;
  let loadedData: T[] = await props.apiListFunc(apiListPage.value, props.size);
  await insertLoadedData(loadedData);
};
/// 將要顯示的資料回傳, 並執行預加載
const insertLoadedData = async (loadedData: T[]) => {
  emit("apiReturnData", loadedData);

  if (props.noLoadMoreData) {
    apiLoadingStatus.value = apiStatus.noDataCanLoad;
    return;
  }
  await preloadData();
};

/// 預加載資料Loading
const preloadData = async () => {
  apiLoadingStatus.value = apiStatus.preDataLoading;

  let page: number = apiListPage.value + 1;
  apiListPage.value = page;

  let loadedData: T[] = await props.apiListFunc(apiListPage.value, props.size);

  if (loadedData.length != 0) {
    /// 加載的資料放進預加載資料
    preloadList.value = loadedData;
    apiLoadingStatus.value = apiStatus.loadingFinish;
  } else {
    /// api全部資料加載完
    preloadList.value = [];
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

.postbody {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 16px;
}

.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.circleWraper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.circle {
  width: 20px;
  height: 20px;
  margin: 0 5px; /* 調整球之間的間距 */
  border-radius: 50%;
  background-color: #fff;
  animation: circle 0.5s alternate infinite ease;
}

@keyframes circle {
  0% {
    transform: translateY(30px) scaleX(1.7);
    height: 5px;
    border-radius: 50px 50px 25px 25px;
  }
  40% {
    transform: translateY(0) scaleX(1);
    height: 20px;
    border-radius: 50%;
  }
  100% {
    transform: translateY(-20px);
  }
}

.circle:nth-child(2) {
  animation-delay: 0.2s;
}
.circle:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
