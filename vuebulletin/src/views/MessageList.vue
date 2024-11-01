<template>
  <div>
    <h1>留言列表</h1>
    <ul class="message-list">
      <li v-for="message in messageStore.messages" :key="message.id" class="message-item">
        <p><strong>發文者:</strong> {{ message.user.name }}</p>
        <p><strong>標題:</strong> {{ message.name }}</p>
        <p><strong>內容:</strong> {{ message.content }}</p>
        <p><strong>建立時間:</strong> {{ new Date(message.created_at).toLocaleString() }}</p>
        <p><strong>更新時間:</strong> {{ new Date(message.updated_at).toLocaleString() }}</p>
        <router-link :to="{ name: 'MessageDetail', params: { id: message.id }}">詳細</router-link>
        
        <!-- 只有當前使用者才顯示編輯按鈕 -->
        <button v-if="message.user.id === userId" @click="goToEditMessage(message.id)">
          編輯
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useMessageStore } from '@/stores/useMessageStore';

// 引入 router 和 store
const router = useRouter();
const userStore = useUserStore();
const messageStore = useMessageStore();

// 當前用戶 ID，通過 Pinia 的 userStore
const userId = computed(() => userStore.user.id);

// 導向編輯留言頁面
function goToEditMessage(messageId) {
  router.push({ name: 'EditMessage', params: { id: messageId } });
}

// 組件掛載後執行
onMounted(() => {
  messageStore.fetchMessages(); // 直接調用 store 中的 fetchMessages 方法
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