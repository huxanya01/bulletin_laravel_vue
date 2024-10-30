<template>
  <div id="app">
    <!-- 頂部導航欄 -->
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/messages">留言列表</router-link>
      <router-link v-if="isLoggedIn" to="/messages/create">新增留言</router-link>

      <div class="auth-links">
        <template v-if="isLoggedIn">
          <span>歡迎, {{ username }}</span>
          <button @click="logout">登出</button>
        </template>
        <template v-else>
          <router-link to="/login">登入</router-link>
          <router-link to="/register">註冊</router-link>
        </template>
      </div>
    </nav>

    <!-- 主頁面內容 -->
    <main>
      <router-view></router-view>
    </main>

    <!-- 頁腳 -->
    <footer>
      <p>&copy; 2024 留言板應用</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isLoggedIn = ref(false); // 使用者登入狀態
const username = ref(''); // 儲存使用者名稱

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    username.value = localStorage.getItem('name') || '使用者'; // 取得使用者姓名
  }
}

async function logout() {
  try {
    // 向 Laravel 後端發送登出請求
    await axios.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // 使用 token 驗證
      }
    });

    // 移除本地的登入相關資訊
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    isLoggedIn.value = false;
    username.value = '';

    // 重定向至留言列表頁面
    router.push('/messages');
  } catch (error) {
    console.error('登出失敗:', error);
  }
}

// 初次加載時檢查登入狀態
onMounted(() => {
  checkLoginStatus();
});
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #2c3e50;
  color: #fff;
}

nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}

.auth-links {
  display: flex;
  gap: 1rem;
}

main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: #fff;
}
</style>
