<script setup lang="ts">
import { ref } from 'vue';
import Editor from 'primevue/editor';
import { Quill } from '@vueup/vue-quill';
import UserService from '../services/user_service';
import { ProfileData } from '../models/reponse/auth/profile_data_reponse_data';
import { LoginRequestData } from '../models/request/auth/login_request_data';
import EmailService from '../services/email_service';



const userData = ref<ProfileData|null>(null);

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

/// 已確認過
const getUserDataByUID = async () => {
  userData.value = await new UserService().getUserDataByUID("tzLaMcP3V9XOAMOcD0FAY5Nf4tE2");
  console.log(userData.value);
};

/// 已確認過
const getUserDataByEmail = async () => {
  const loginData: LoginRequestData = {
    email: '',
    password: ''
  };
  
  userData.value = await new UserService().getUserDataByEmail(loginData, "normalSign");
  console.log(userData.value);
};

/// 已確認過
const sendEmail = async () => {
 const email: string = '';
 await new EmailService().sendCaptchaMail(email, "signUp");
};



</script>

<template>
  <div>
    <Editor  ref="editorRef" v-model="value" editorStyle="height: 320px;" placeholder="請輸入文字" :modules="editorModules" >
     
    </Editor>

    <button @click="outputValue">輸出內容</button>
    <button @click="insertCustomText">插入自定義文字</button>

    <button @click="getUserDataByUID">取得使用者資料by Id</button> 
    <button @click="getUserDataByEmail">取得使用者資料by Email&Pwd</button> 
    <button @click="sendEmail">寄驗證碼</button> 
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
