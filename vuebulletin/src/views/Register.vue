<template>
  <div>
    <h1>註冊</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">電子郵件:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="name">帳號:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="password">密碼:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="password_confirmation">確認密碼:</label>
        <input type="password" id="password_confirmation" v-model="password_confirmation" required />
      </div>
      <button type="submit">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const name = ref('');
const password = ref('');
const password_confirmation = ref('');

// 註冊函數
async function register() {
  if (password.value !== password_confirmation.value) {
    alert("密碼與確認密碼不符");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/register', {
      email: email.value,
      name: name.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });

    const { token, user } = response.data;
    localStorage.setItem('token', token); // 儲存 token
    localStorage.setItem('name', user.name); // 儲存使用者姓名
    localStorage.setItem('email', user.email); // 儲存使用者電子郵件
    alert("註冊成功！");
    router.push('/messages'); // 導引到 /messages
  } catch (error) {
    console.error("註冊失敗:", error);
    alert("註冊失敗，請檢查輸入資料。");
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