<template>
  <div
    v-if="imageLoadError"
    class="normalImgContainer"
    :style="{
      width: size,
      height: size,
      borderRadius: borderRadius,
      padding: `${parseFloat(size) * 0.2}px`
    }"
  >
    <img :src="avatarUrl()" />
  </div>

  <img
    v-else
    :src="avatarUrl()"
    class="avatarImg"
    :style="{ width: size, height: size, borderRadius: borderRadius }"
    @error="handleImageError"
    alt="Avatar"
  />
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import { EditTools } from "@/global/edit_tools";
import type { Ref } from "vue";
import { ref } from "vue";

const editTools: EditTools = new EditTools();
const imageLoadError: Ref<boolean> = ref(false);

const props = defineProps({
  imgurl: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: "100px"
  },
  borderRadius: {
    type: String,
    default: "100px"
  }
});

const handleImageError = (): void => {
  imageLoadError.value = true;
};

const avatarUrl = (): string => {
  if (imageLoadError.value || !props.imgurl) {
    return AppImage.defaultUserImg;
  }

  return editTools.getRealImgStr(props.imgurl);
};
</script>

<style scoped>
.normalImgContainer {
  background-color: aliceblue;
}
.avatarImg {
  object-fit: cover;
}
</style>
