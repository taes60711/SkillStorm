<template>
  <div>PostByBoard type: {{ route.params.boardtype }}</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  console.log(route.params.boardtype);
});
</script>

<style scoped></style>
