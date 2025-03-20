<template>
  <div v-if="imgPath != null">
    <div class="IconText_Container">
      <img
        :src="imgPath"
        :style="{
          width: size,
          height: size,
        }"
      />
      <p class="IconText_Text">{{ text }}</p>
    </div>
  </div>
  <div v-else-if="icon != null">
    <div class="IconText_Container">
      <i :class="icon" :style="{ fontSize: size }"></i>
      <p class="IconText_Text">{{ text }}</p>
    </div>
  </div>
  <div v-else>
    <div class="IconText_Container">
      <slot></slot>
      <p class="IconText_Text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imgPath: {
    type: String,
  },
  icon: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "20px",
  },
});
</script>

<style scoped>
.IconText_Container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.IconText_Text {
  padding-left: 10px;
}
</style>
