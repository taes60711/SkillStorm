

<script setup lang="ts">

import CourseEditViewModel from '@/view_models/course/course_edit_view_model';
import Dropdown from 'primevue/dropdown';
import RichTextEditor from '../utilities/RichTextEditor.vue';
import { SkillTypes } from '@/models/skill_type';
import { MultiSelect } from 'primevue';
import { GlobalData } from '@/global/global_data';
import CourseChapterEdit from './CourseChapterEdit.vue';

const viewModel = new CourseEditViewModel();

const levelItems: string[] =["1","2","3","4","5"];

</script>

<template>
  <div>
    <p>標題</p>
    <input type="text" v-model="viewModel.titleController.value">
    
    <p>大綱</p>
    <textarea v-model="viewModel.outlineController.value" placeholder="大綱" rows="4" cols="50"></textarea>
    
    <p>前置需求</p>
    <textarea v-model="viewModel.beforeNeedController.value" placeholder="前置需求" rows="4" cols="50"></textarea>
   
    <p>程度</p>
    <Dropdown v-model="viewModel.selectedLevel.value" :panelStyle="{ backgroundColor: '#FF6347' }" :options="levelItems" placeholder="程度"/>
    
    <p>類別</p>
    <Dropdown v-model="viewModel.selectedType.value" :panelStyle="{ backgroundColor: '#FF6347' }" :options="SkillTypes" optionLabel="name" placeholder="類別"/>
    
    <p>技能</p>
    <MultiSelect v-model="viewModel.selectedSkill.value" :panelStyle="{ backgroundColor: '#FF6347' }" :options="GlobalData.skillData" optionLabel="name" filter placeholder="Select Skill"/>

    <p>公開</p>
    <input type="checkbox" v-model="viewModel.isPublic.value">

    <p>詳細內容</p>
    <RichTextEditor v-model:htmlString="viewModel.htmlString.value"></RichTextEditor>
   
    <button @click="viewModel.addChapter">章節＋</button>
    <div v-for="(chapterEditInfo, index) in viewModel.chapters.value" v-bind:key="chapterEditInfo">
      <p>章節{{ index }}</p>
      <CourseChapterEdit v-model:title="chapterEditInfo.title" v-model:content="chapterEditInfo.content" ></CourseChapterEdit>
      <button @click="viewModel.deleteChapter(index)">刪除該章節</button>
      <button v-if="index != viewModel.chapters.value.length - 1" @click="viewModel.changeChapterIndex(index)">章節往下移動</button>
    </div>
 
    <br>
    <button @click="viewModel.send">送出</button>
  </div>
</template>


<style scoped>
  p{
    color: #FFFFFF;
  }

  button{
    background-color: rgb(0, 0, 0);
    margin: 0 10px 0 0;
    padding: 5px;
  }
</style>
