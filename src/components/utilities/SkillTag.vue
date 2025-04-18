<template>
  <div class="skillContainer">
    <div class="levelContaier" v-if="level">{{ props.level }}</div>
    <p>
      {{ props.skillName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  skillName: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
});
</script>

<style scoped>
.skillContainer {
  display: inline-flex;
  flex-direction: row;
  background-color: rgb(77, 77, 78);
  padding: 3px 8px;
  border-radius: 12px;
  align-items: center;
  margin-right: 10px;
}

.skillContainer .levelContaier {
  background-color: rgb(162, 162, 161);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  margin-right: 5px;
}
</style>
