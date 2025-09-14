<template>
  <div
    v-if="!props.imgurl"
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
    alt="Avatar"
  />
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import { EditTools } from "@/global/edit_tools";

const editTools: EditTools = new EditTools();

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

const avatarUrl = (): string => {
  if (!props.imgurl) {
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
