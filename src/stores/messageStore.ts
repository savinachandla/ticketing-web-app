import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Message {
  text: string;
  type: 'success' | 'error' | 'warning';
}

export const useMessageStore = defineStore('messageStore', () => {
  const message = ref<Message | null>(null);

  const setMessage = (text: string, type: 'success' | 'error' | 'warning') => {
    message.value = { text, type };
  };

  const clearMessage = () => {
    message.value = null;
  };

  return { message, setMessage, clearMessage };
});
