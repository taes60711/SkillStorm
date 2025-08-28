<template>
  <div class="postBoadContainer">
    <div class="postBoard">
      <div v-for="(item, index) in MyCourseItems" v-bind:key="item">
        <p class="postBoardItem" @click="() => chageMyCoursePage(item)">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const MyCourseItems: String[] = ["加入的", "我的"];

const chageMyCoursePage = defineModel("chageMyCoursePage");
</script>

<style scoped>
.postBoadContainer {
  width: 250px;
  margin-right: 120px;
}

.postBoard {
  background-color: rgb(41, 41, 42);
  margin-top: 40px;
  padding: 10px;
  border-radius: 15px;
  border: 0.2px solid rgba(255, 255, 255, 0.134);
}

.postBoardItem {
  padding: 5px 10px 5px 10px;
  margin: 2px 0 2px 0;
  border-radius: 8px;
  cursor: pointer;
}

.postBoardItem:hover {
  background-color: rgb(35, 35, 36);
}

@media screen and (max-width: 1160px) {
  .postBoadContainer,
  .postBoard {
    display: none;
  }
}
</style>
