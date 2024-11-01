<template>
  <div>
    <h1>Create Message</h1>
    <form @submit.prevent="submitMessage">
      <label for="name">標題:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="content">內容:</label>
      <textarea id="content" v-model="content" required></textarea>

      <button type="submit">提交</button>
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/useMessageStore';

const name = ref('');
const content = ref('');
const router = useRouter();
const messageStore = useMessageStore();

async function submitMessage() {
  try {
    const user_id = localStorage.getItem('id');
    const newMessage = {
      user_id: user_id,
      name: name.value,
      content: content.value
    };

    const successMessage = await messageStore.createMessage(newMessage);
    console.log(successMessage); // 顯示成功訊息

    // 清空輸入框並重定向至留言列表
    name.value = '';
    content.value = '';
    router.push('/messages');
  } catch (error) {
    console.error("新增留言錯誤:", error);
    // 可以顯示錯誤訊息給使用者
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

button {
  padding: 0.5rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}
</style>