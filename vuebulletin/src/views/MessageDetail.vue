<!-- MessageDetail.vue -->
<template>
  <div>
    <h1>詳細內容</h1>
    <div v-if="message">
      <p><strong>發文者:</strong> {{ message.user.name }}</p>
      <p><strong>標題:</strong> {{ message.name }}</p>
      <p><strong>內容:</strong> {{ message.content }}</p>
      <p><strong>建立時間:</strong> {{ new Date(message.created_at).toLocaleString() }}</p>
      <p><strong>更新時間:</strong> {{ new Date(message.updated_at).toLocaleString() }}</p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const message = ref(null);

async function fetchMessageDetail() {
  try {
    const response = await axios.get(`http://localhost:8000/api/messages/${route.params.id}`);
    message.value = response.data;
  } catch (error) {
    console.error("Error fetching message detail:", error);
  }
}

onMounted(() => {
  fetchMessageDetail();
});
</script>