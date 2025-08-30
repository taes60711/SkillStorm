<template>
  <div class="skillBarContainer">
    <p class="leveContainer">{{ `Lv ${props.level}` }}</p>
    <p>{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String
  },
  level: {
    type: Number
  }
});
</script>

<style scoped>
.skillBarContainer {
  background-color: rgb(72, 73, 73);
  padding: 2px 8px;
  display: inline-flex;
  flex-direction: row;
  border-radius: 10px;
  align-items: center;
}

.skillBarContainer p {
  font-size: 12px;
}

.leveContainer {
  margin-right: 5px;
  background-color: rgb(46, 45, 45);
  border-radius: 50%;
  padding: 6px 5px;
  font-size: 8px !important;
  font-weight: 800;
}
</style>
