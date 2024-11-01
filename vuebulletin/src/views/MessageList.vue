<template>
  <div>
    <h1>留言列表</h1>
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" class="message-item">
        <p><strong>發文者:</strong> {{ message.user.name }}</p>
        <p><strong>標題:</strong> {{ message.name }}</p>
        <p><strong>內容:</strong> {{ message.content }}</p>
        <p><strong>建立時間:</strong> {{ new Date(message.created_at).toLocaleString() }}</p>
        <p><strong>更新時間:</strong> {{ new Date(message.updated_at).toLocaleString() }}</p>
        <router-link :to="{ name: 'MessageDetail', params: { id: message.id }}">詳細</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const messages = ref([]);

// 方法：從後端獲取留言列表
async function fetchMessages() {
  try {
    const response = await axios.get('http://localhost:8000/api/messages');
    messages.value = response.data; // 假設後端返回的資料格式是 { data: [...] }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// 組件掛載後執行 fetchMessages 方法
onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
/* 樣式 */
.message-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.message-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f7f9fc;
}

.message-item p {
  margin: 0.5rem 0;
}

.message-item p strong {
  color: #2c3e50;
  font-weight: bold;
}

/* 增加段落間距 */
.message-item p + p {
  margin-top: 0.5rem;
}
</style>