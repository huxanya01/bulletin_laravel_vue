<template>
    <div>
      <h1>Create Message</h1>
      <form @submit.prevent="createMessage">
        <!-- Form fields for creating a new message -->
        <button type="submit">Submit</button>
      </form>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
 // 定義新增留言函數
 function createMessage() {
    // 處理新增留言邏輯
    console.log("CreateMessage logic executed");
  }
</script>