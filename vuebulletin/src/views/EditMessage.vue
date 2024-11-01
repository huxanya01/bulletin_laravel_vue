<template>
  <div>
    <h1>編輯留言</h1>
    <form @submit.prevent="editMessage">
      <div>
        <label for="name">標題:</label>
        <input type="text" id="name" v-model="messageTitle" required />
      </div>

      <div>
        <label for="content">內容:</label>
        <textarea id="content" v-model="messageContent" required></textarea>
      </div>

      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/useMessageStore';

const route = useRoute();
const router = useRouter();
const messageStore = useMessageStore();

// 定義表單綁定的變量
const messageTitle = ref('');
const messageContent = ref('');

// 當組件掛載時，載入要編輯的留言
onMounted(async () => {
  const messageId = route.params.id; // 獲取留言 ID
  await messageStore.fetchMessages(); // 確保已加載留言列表
  const message = messageStore.messages.find(m => m.id === parseInt(messageId));
  if (message) {
    messageTitle.value = message.name;
    messageContent.value = message.content;
  }
});

// 編輯留言並提交至後端
async function editMessage() {
  const messageId = route.params.id;
  const updatedMessage = {
    name: messageTitle.value,
    content: messageContent.value,
  };

  try {
    await messageStore.updateMessage(messageId, updatedMessage);
    router.push({ name: 'MessageList' }); // 重定向至留言列表頁面
  } catch (error) {
    console.error("Error updating message:", error);
  }
}
</script>

<style scoped>
/* 樣式 */
form div {
  margin-bottom: 1rem;
}

form label {
  display: block;
  font-weight: bold;
}

form input, form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>