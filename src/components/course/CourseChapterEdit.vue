<script setup lang="ts">

import RichTextEditor from '../utilities/RichTextEditor.vue';

const title = defineModel('title');
const content = defineModel('content');
</script>

<template>
  <div>
    <p>章節標題</p>
    <input type="text" v-model="title">
    <p>章節內文</p>
    <RichTextEditor v-model:htmlString="content"></RichTextEditor>
  </div>
</template>

<style scoped>
  p{
    color: #FFFFFF;
  }
</style>
