import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // 確認路由正確引入
import { createPinia } from 'pinia';

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app')
