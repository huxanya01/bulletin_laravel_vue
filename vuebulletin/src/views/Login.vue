<template>
  <div>
    <h1>登入</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">電子郵件:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">密碼:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登入</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

async function login() {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value
    });

    // 假設回應包含 user 的 name, email 以及 token
    const {  user, token } = response.data;

    userStore.login(user, token);
    // 儲存 token, name, email 到 localStorage
    // localStorage.setItem('name', user.name); // 儲存使用者姓名
    // localStorage.setItem('email', user.email); // 儲存使用者電子郵件
    // localStorage.setItem('token', token);
    
    // 將使用者重導至留言列表頁面
    router.push('/messages');
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.5rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1a242f;
}
</style>