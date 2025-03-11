<template>
    <div class="phoneHintModal_Container">
      <p>{{ `系統：${os} 請至商店下載App哦` }}</p>
    
    </div>
</template>

<script setup lang="ts">


const os: string = getDeviceOS();

function getDeviceOS(): string {
    const userAgent = navigator.userAgent;

    // 判斷 iOS 裝置
    if (/iPhone|iPad|iPod/.test(userAgent)) {
        return 'iOS';
    }

    // 判斷 Android 裝置
    if (/Android/.test(userAgent)) {
        return 'Android';
    }

    return 'Other'; // 其他設備
}
</script>
  
<style scoped>
.phoneHintModal_Container{
  background-color: rgb(174, 64, 64);
  width: 90vw;
  height: 60vh;
}
</style>