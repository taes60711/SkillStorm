<template>
  <div class="multi-select">
    <!-- 自訂下拉 -->
    <div class="dropdown" ref="multiSelectRef" @click="toggleDropdown">
      <!-- 已選技能 + 等級 -->
      <div v-if="selectedSkills.length">
        <div v-for="skill in selectedSkills" :key="skill.name" class="skillBar">
          {{ skill.name }}
          <MainButton :onPress="deleteSkill">
            <i class="fa-solid fa-trash deleteBtn"></i>
          </MainButton>

          <select v-model="skill.level" class="leveContainer">
            <option v-for="level in levels" :key="level" :value="level">
              Lv {{ level }}
            </option>
          </select>
        </div>
      </div>
      <div v-else>{{ "請選擇技能" }}</div>
      <div class="options" v-if="dropdownOpen">
        <!-- 搜尋框 -->
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="搜尋技能..."
          class="search-input"
          @click.stop
        />
        <!-- 技能列表 -->
        <div
          v-for="skill in filteredSkills"
          :key="skill.id"
          class="option"
          @click.stop="toggleSkill(skill.name)"
        >
          <label>{{ skill.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/global/global_data";
import type { Skill } from "@/models/reponse/auth/profile_data_reponse_data";
import MainButton from "@/components/utilities/MainButton.vue";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "@vue/runtime-core";

const props = defineProps<{
  selectedSkills: Skill[];
}>();

const emit = defineEmits<{
  (e: "update", value: Skill[]): void;
}>();

const selectedSkills = ref<Skill[]>([]);
const levels = [1, 2, 3, 4, 5];
const dropdownOpen = ref(false);
const multiSelectRef = ref<HTMLElement | null>(null);

const searchKeyword = ref("");

const filteredSkills = computed(() => {
  if (!searchKeyword.value) return GlobalData.skillData;
  return GlobalData.skillData.filter((skill) =>
    skill.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleSkill = (skillName: string) => {
  const index = selectedSkills.value.findIndex((s) => s.name === skillName);
  if (index === -1) {
    // 新增一個技能，等級預設 1
    selectedSkills.value.push({
      name: skillName,
      level: 1,
      month: 0
    });
  } else {
    // 移除技能
    selectedSkills.value.splice(index, 1);
  }
};

const deleteSkill = (skillName: string) => {
  const index = selectedSkills.value.findIndex((s) => s.name === skillName);
  selectedSkills.value.splice(index, 1);
};

watch(
  selectedSkills,
  (newVal) => {
    console.log([...newVal]);
    emit("update", [...newVal]);
  },
  { deep: true }
);

// 點擊外部收起下拉
const handleClickOutside = (event: MouseEvent) => {
  if (
    multiSelectRef.value &&
    !multiSelectRef.value.contains(event.target as Node)
  ) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  // 初始化父元件傳進來的 selectedSkills
  selectedSkills.value = props.selectedSkills.map((skill: { level: any }) => ({
    ...skill,
    level: skill.level ?? 1 // 沒等級就預設 1
  }));

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.multi-select {
  display: flex;
  flex-direction: column;
}

.dropdown {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
  position: relative;
  user-select: none;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  background: #7c7b7b;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.search-input {
  width: 90%;
  margin: 5px;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.option {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 5px;
}

.option:hover {
  background-color: #888484;
}

.result {
  display: flex;
  flex-direction: row;
}

.skillBar {
  background-color: rgb(72, 73, 73);
  padding: 2px 4px;

  display: inline-flex;
  flex-direction: row;
  border-radius: 10px;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 5px;
}

.leveContainer {
  /* margin-left: 5px; */
  background-color: rgb(46, 45, 45) !important;
  border-radius: 50%;
  padding: 8px 5px !important;
  font-size: 8px !important;
  font-weight: 800;
  cursor: pointer;
}

.deleteBtn {
  border-radius: 50%;
  padding: 5px !important;
  font-weight: 800;
  cursor: pointer;
}
</style>
