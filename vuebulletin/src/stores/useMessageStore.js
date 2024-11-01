import { defineStore } from 'pinia';
import axios from 'axios';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [], // 存放留言列表
  }),

  actions: {
    async fetchMessages() {
      try {
        const response = await axios.get('http://localhost:8000/api/messages');
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },

    async createMessage(newMessage) {
      try {
        // 從 localStorage 獲取 token
        const token = localStorage.getItem('token');

        const response = await axios.post(
          'http://localhost:8000/api/messages',
          newMessage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            //   'Content-Type': 'application/json'
            },
          }
        );

        // 將新留言加入 messages 狀態
        this.messages.push(response.data.data);
        return response.data.message; // 回傳成功訊息
      } catch (error) {
        console.error("新增留言錯誤:", error);
        throw error;
      }
    },

    async updateMessage(id, updatedMessage) {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:8000/api/messages/${id}`, updatedMessage, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // 更新本地 messages 狀態
          const messageIndex = this.messages.findIndex(m => m.id === id);
          if (messageIndex !== -1) {
            this.messages[messageIndex] = { ...this.messages[messageIndex], ...updatedMessage };
          }
        } catch (error) {
          console.error("Error updating message:", error);
          throw error;
        }
    }
    
  },
});