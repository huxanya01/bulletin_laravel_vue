import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: {
      name: '',
      email: ''
    }
  }),
  actions: {
    login(user, token) {
      this.isLoggedIn = true;
      this.user.name = user.name;
      this.user.email = user.email;
      localStorage.setItem('token', token);
      localStorage.setItem('id', user.id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);   
    },
    logout() {
      this.isLoggedIn = false;
      this.user.name = '';
      this.user.email = '';
      localStorage.removeItem('token');
      ocalStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }
  },
  getters: {
    userName: (state) => state.user.name,
    userEmail: (state) => state.user.email
  }
});