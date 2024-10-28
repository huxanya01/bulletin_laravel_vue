<template>
  <div id="app">
    <!-- 頂部導航欄 -->
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/messages">留言列表</router-link>
      <router-link to="/messages/create">新增留言</router-link>
      
      <div class="auth-links">
        <router-link to="/login">登入</router-link>
        <router-link to="/register">註冊</router-link>
        <button v-if="isLoggedIn" @click="logout">登出</button>
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
 <!-- <Messages/> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false); // 使用者登入狀態

function logout() {
  // 模擬登出
  isLoggedIn.value = false;
  router.push('/login'); // 重定向至登入頁面
}
// import Messages from './components/Messages.vue'
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
  padding: 1.5rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: #fff;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
