<template>
  <div class="multi-select" ref="multiSelectRef">
    <!-- 自訂下拉 -->
    <div class="dropdown" @click="toggleDropdown">
      <span>{{
        selectedSkillsNames.length
          ? selectedSkillsNames.join(", ")
          : "請選擇技能"
      }}</span>
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
          <input
            type="checkbox"
            :checked="selectedSkillsNames.includes(skill.name)"
            readonly
          />
          <label>{{ skill.name }}</label>
        </div>
      </div>
    </div>

    <!-- 已選技能 + 等級 -->
    <div class="result" v-if="selectedSkillsNames.length">
      <p>已選擇的技能：</p>
      <div v-for="skillName in selectedSkillsNames" :key="skillName">
        {{ skillName }}
        <select v-model="selectedSkillsLevels[skillName]">
          <option v-for="level in levels" :key="level" :value="level">
            Lv {{ level }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/global/global_data";
import type { Skill } from "@/models/reponse/auth/profile_data_reponse_data";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from "@vue/runtime-core";

const props = defineProps<{
  selectedSkills: Skill[];
}>();

const emit = defineEmits<{
  (e: "update", value: Record<string, number>): void;
}>();

const selectedSkillsNames = ref<string[]>([]);
const selectedSkillsLevels = reactive<Record<string, number>>({});
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
  const index = selectedSkillsNames.value.indexOf(skillName);
  if (index === -1) {
    selectedSkillsNames.value.push(skillName);
    selectedSkillsLevels[skillName] = 1;
  } else {
    selectedSkillsNames.value.splice(index, 1);
    delete selectedSkillsLevels[skillName];
  }
};

watch(
  selectedSkillsLevels,
  (newVal: any) => {
    console.log({ ...newVal });
    emit("update", { ...newVal });
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
  for (let i = 0; i < props.selectedSkills.length; i++) {
    const skill = props.selectedSkills[i];
    if (!selectedSkillsNames.value.includes(skill.name)) {
      selectedSkillsNames.value.push(skill.name);
      selectedSkillsLevels[skill.name] = skill.level ?? 1;
    }
  }
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
  gap: 10px;
}

.dropdown {
  border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
  width: 200px;
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

.result select {
  margin-left: 10px;
}
</style>
