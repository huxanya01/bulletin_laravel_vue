import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import MessageList from '@/views/MessageList.vue';
import MessageDetail from '@/views/MessageDetail.vue';
import CreateMessage from '@/views/CreateMessage.vue';
import EditMessage from '@/views/EditMessage.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/messages', name: 'MessageList', component: MessageList },
  { path: '/messages/:id', name: 'MessageDetail', component: MessageDetail, props: true },
  { path: '/messages/create', name: 'CreateMessage', component: CreateMessage },
  { path: '/messages/edit/:id', name: 'EditMessage', component: EditMessage, props: true },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;