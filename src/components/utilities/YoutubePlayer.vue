<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const props = defineProps({
  videoId: String, // 接收 YouTube 影片 ID
});

const videoPlayer = ref(null);
let player = null;

onMounted(() => {
  player = videojs(videoPlayer.value, {
    techOrder: ["youtube"],
    controls: true,
    autoplay: false,
    preload: "auto",
    width: 300,
    height: 200,
    sources: [
      {
        type: "video/youtube",
        src: `https://www.youtube.com/watch?v=${props.videoId}`,
      },
    ],
  });
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
  }
});

// 監聽 `videoId` 變更，更新影片來源
watch(
  () => props.videoId,
  (newId) => {
    if (player) {
      player.src({
        type: "video/youtube",
        src: `https://www.youtube.com/watch?v=${newId}`,
      });
      player.play();
    }
  }
);
</script>
