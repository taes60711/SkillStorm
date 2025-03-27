<template>
  <button
    v-if="!hasSlot && props.text != null"
    class="mainBtnContainer"
    @click="props.onPress"
  >
    {{ props.text }}
  </button>
  <div
    v-else-if="hasSlot"
    :class="{
      slotContainer: needOpacity,
      noOpacitySlotContainer: !needOpacity,
    }"
    @click="props.onPress"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "@vue/runtime-core";

const props = defineProps({
  onPress: {
    type: Function,
    required: true,
  },
  text: {
    type: String,
  },
  needOpacity: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();
const hasSlot = slots.default != null;
</script>

<style scoped>
.mainBtnContainer {
  background-color: rgb(49, 48, 48);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.mainBtnContainer:hover {
  opacity: 0.7;
}

.slotContainer:hover {
  opacity: 0.7;
  cursor: pointer;
}

.noOpacitySlotContainer:hover {
  cursor: pointer;
}
</style>
