<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Editor from 'primevue/editor';
import { Quill } from '@vueup/vue-quill';
import Modal from '../components/utilities/Modal.vue';

const value = ref('');
const editorRef = ref<any>(null);


const showModal = ref(false);
const urlImgController = ref<string>('');

const showVideoModal = ref(false);
const youtubeController = ref<string>('');

const showLinkModal = ref(false);
const LinkTextController = ref<string>('');
const LinkController = ref<string>('');

const COLORS = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008A00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
];

const editorModules = {
  toolbar: [
    ['image'],
    [{ color: COLORS }],
  ],
};

onMounted(async () => {
  setTimeout(() => {
    addCustomButton();
  }, 100); 
});



const addCustomButton = () =>{

  const quill = editorRef.value?.quill; 
  const toolbar = quill.getModule('toolbar'); 

    // 创建自定义按钮数组
    const buttons = [
    {
      id: 'custom-button-1',
      text: '影',
      action: ()=> { showVideoModal.value = !showVideoModal.value }
    },
    {
      id: 'custom-button-2',
      text: '圖',
      action: ()=> { showModal.value = !showModal.value }
    },
    {
      id: 'custom-button-3',
      text: '鏈',
      action: ()=> { showLinkModal.value = !showLinkModal.value }
    },
  ];

  buttons.forEach(button => {
    const customButton = document.createElement('button');
    customButton.innerHTML = button.text;
    customButton.id = button.id;

    toolbar.container.appendChild(customButton);

    customButton.addEventListener('click', button.action);
  });

}
    

const insertCustomImage = (imgUrl: string) => {

  console.log(imgUrl);
  const editor: Quill = editorRef.value?.quill;
  const cursorPos: number = editor.getSelection()?.index || 0;
  const inputed: string = `<img src="${imgUrl}">`;
  editor.clipboard.dangerouslyPasteHTML(cursorPos, inputed);
  value.value = editor.root.innerHTML;
  editor.setSelection(cursorPos + inputed.length);
};

const insertCustomVideo = (videoUrl: string) => {
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

const outputValue = () => {
  console.log('Editor Value:', value.value);
};

</script>

<template>
  <div>
    <Editor ref="editorRef" v-model="value" editorStyle="height: 320px;" placeholder="請輸入文字" :modules="editorModules">
    </Editor>

    <button @click="outputValue">送出</button>
 
    
    <!-- link Insert -->
    <Modal :visible="showLinkModal" @update:visible="showLinkModal = $event">

      <p>Link Text: </p>
      <input type="text" v-model="LinkTextController">
      <p>Link: </p>
      <input type="text" v-model="LinkController">

      <button
      @click="insertCustomLink(LinkController, LinkTextController)">插入鏈結</button>
    </Modal>

    <!-- youtubeVideo Insert -->
    <Modal :visible="showVideoModal" @update:visible="showVideoModal = $event">
      <h2>youtube URL</h2>
      <input type="text" v-model="youtubeController">
      <button
      @click="insertCustomVideo(youtubeController)">插入影片</button>
    </Modal>

    <!-- Img Insert -->
    <Modal :visible="showModal" @update:visible="showModal = $event">
      <h2>Image URL</h2>
      <input type="text" v-model="urlImgController">
      <button
      @click="insertCustomImage(urlImgController)">插入圖片</button>
    </Modal>


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
