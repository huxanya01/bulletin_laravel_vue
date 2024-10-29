<template>
    <div>
      <h1>登入</h1>
      <form @submit.prevent="login">
        <!-- Add form fields for login -->
        <button type="submit">Login</button>
      </form>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  // 定義登入函數
  function login() {
    // 處理登入邏輯
    console.log("Login logic executed");
  }
</script>
  
<style scoped>
/* Optional: Add specific styles for the Login page */
</style>