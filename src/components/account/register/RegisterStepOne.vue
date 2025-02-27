<template>
    <label for="email">Email</label>
    <input type="text" v-model="viewModel.emailController.value">
    <p class="register_err"  v-if="viewModel.emailError.value !=''">{{ viewModel.emailError.value }}</p>
    <button @click="viewModel.signUpStart">開始註冊</button>
</template>
  
<script setup lang="ts">
  const viewModel = defineModel('RegisterViewModel');
</script>
  
<style scoped>
   .register_err{
    color: #f90202;
  }
</style>
  