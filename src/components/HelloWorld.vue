<script setup lang="ts">
import { ref } from 'vue';
import Editor from 'primevue/editor';
import { Quill } from '@vueup/vue-quill';
import APIClient from '../api_service/api_client';
import UserService from '@/api_service/user_service';

const value = ref('');
const editorRef = ref<any>(null); 
  

const COLORS = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008A00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
];


const editorModules = {
  toolbar: [
  ['link'],
  [{ color: COLORS }], 
  ],
};

const insertCustomText = () => {
  const editor: Quill = editorRef.value?.quill;
  const cursorPos: number = editor.getSelection()?.index || 0;
  const inputed: string = "這是自定義文字";
  editor.insertText(cursorPos, inputed); 
  value.value = editor.root.innerHTML;
  editor.setSelection(cursorPos + inputed.length);
};


const outputValue = () => {
  console.log('Editor Value:', value.value);
};


const callApi = async () => {
  /// 暫時
  new UserService().getUserDataByUID("uid");
  
};


</script>

<template>
  <div>
    <Editor  ref="editorRef" v-model="value" editorStyle="height: 320px;" placeholder="請輸入文字" :modules="editorModules" >
     
    </Editor>

    <button @click="outputValue">輸出內容</button>
    <button @click="insertCustomText">插入自定義文字</button>
    <button @click="callApi">呼叫API</button> 
  </div>
</template>

<style scoped>

::v-deep(.p-editor) {
  width:  500px;
  border: 2px solid #45a049;
}

::v-deep(.p-editor-toolbar) {
  display: none;
}

::v-deep(.ql-toolbar.ql-snow) {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
