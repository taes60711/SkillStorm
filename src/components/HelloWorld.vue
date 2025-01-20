<script setup lang="ts">
import { ref } from 'vue';
import Editor from 'primevue/editor';
import { Quill } from '@vueup/vue-quill';

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

const insertCustomImage = (imgUrl:string) => {
  const editor: Quill = editorRef.value?.quill;
  const cursorPos: number = editor.getSelection()?.index || 0;
  const inputed: string = `<img src="${imgUrl}">`;
  editor.clipboard.dangerouslyPasteHTML(cursorPos, inputed);
  value.value = editor.root.innerHTML;
  editor.setSelection(cursorPos + inputed.length);
};

const insertCustomVideo = (videoUrl:string) => {
  const editor: Quill = editorRef.value?.quill;
  const cursorPos: number = editor.getSelection()?.index || 0;
  const ytId: string = getYtvideoID(videoUrl);        
  const ytURL: string = `https://www.youtube.com/embed/${ytId}`;

  const inputed: string = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${ytURL}"></iframe><p><br></p>`;
  editor.clipboard.dangerouslyPasteHTML(cursorPos, inputed);
  value.value = editor.root.innerHTML;
  editor.setSelection(cursorPos + inputed.length);
};

function getYtvideoID(url: string): string {
  let start = 0;

  if (url.includes('/shorts/')) {
    start = url.indexOf('/shorts/') + '/shorts/'.length;
  } else if (url.includes('/youtu.be/')) {
    start = url.indexOf('/youtu.be/') + '/youtu.be/'.length;
  } else if (url.includes('src=')) {
    start = url.indexOf('src="https://www.youtube.com/embed/') + 'src="https://www.youtube.com/embed/'.length;
  } else {
    start = url.indexOf('?v=') + '?v='.length;
  }

  let end = 0;

  if (url.includes('&list')) {
    end = url.indexOf('&list');
  } else if (url.includes('?si')) {
    end = url.indexOf('?si');
  } else if (url.includes('src=')) {
    end = url.indexOf('">');
  } else if (url.includes('&')) {
    end = url.indexOf('&');
  } else {
    end = url.length;
  }

  let tmpId = "";

  if (end === -1 || (!url.includes("youtu.be/") && !url.includes("youtube.com"))) {
    tmpId = "err";
  } else {
    tmpId = url.substring(start, end);
  }

  return tmpId;
}

const insertCustomLink = (link: string, linkText: string) => {
  const editor: Quill = editorRef.value?.quill;
  const cursorPos: number = editor.getSelection()?.index || 0;
  const inputed: string = `<p><a href=${link} rel="noopener noreferrer" target="_blank">${linkText}</a><br></p>`;
  editor.clipboard.dangerouslyPasteHTML(cursorPos, inputed);
  value.value = editor.root.innerHTML;
  editor.setSelection(cursorPos + inputed.length);
};




</script>

<template>
  <div>
    <Editor ref="editorRef" v-model="value" editorStyle="height: 320px;" placeholder="請輸入文字" :modules="editorModules">

    </Editor>

    <button @click="outputValue">輸出內容</button>
    <button @click="insertCustomText">插入自定義文字</button>
    <button @click="insertCustomVideo('https://youtu.be/PS9Ek7N7fvI?si=JsOsUNTGGc1M-yzf')">插入影片</button>
    <button @click="insertCustomImage('https://d1b8dyiuti31bx.cloudfront.net/NewsPhotos/20230504/51_123347600602.jpg')">插入圖片</button>

    <button @click="insertCustomLink('https://www.youtube.com/watch?v=4UNhP9S1Iz4&ab_channel=KOCOWATVBrasil','testssss')">插入鏈結</button>
  </div>
</template>

<style scoped>
::v-deep(.p-editor) {
  width: 500px;
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
