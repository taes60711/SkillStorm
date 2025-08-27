<template>
  <button
    v-if="!hasSlot && props.text != null"
    :class="[
      textLeft ? 'mainLeftBtnContainer' : 'mainBtnContainer',
      noBackground ? 'noBackgroundBtn' : ''
    ]"
    @click="
      (e) => {
        e.stopPropagation();
        props.onPress();
      }
    "
  >
    {{ props.text }}
  </button>
  <div
    v-else-if="hasSlot"
    :class="{
      slotContainer: needOpacity,
      noOpacitySlotContainer: !needOpacity
    }"
    @click="
      (e) => {
        e.stopPropagation();
        props.onPress();
      }
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "@vue/runtime-core";

const props = defineProps({
  onPress: {
    type: Function,
    required: true
  },
  text: {
    type: String
  },
  textLeft: {
    type: Boolean,
    default: false
  },
  needOpacity: {
    type: Boolean,
    default: true
  },
  noBackground: {
    type: Boolean,
    default: false
  }
});

const slots = useSlots();
const hasSlot = slots.default != null;
</script>

<style scoped>
.mainBtnContainer {
  background-color: rgb(44, 43, 43);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.mainLeftBtnContainer {
  background-color: rgb(44, 43, 43);
  padding: 5px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: white;
}

.noBackgroundBtn {
  background-color: transparent !important;
}

.mainBtnContainer:hover {
  opacity: 0.7;
}

.mainLeftBtnContainer:hover {
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
