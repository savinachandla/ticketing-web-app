<template>
  <v-snackbar
    v-model="isSnackbarVisible"
    :color="messageColor"
    timeout="4000"
    location="top"
    :width="10"
    :height="20"
  >
    <!-- Message Text -->
    <span class="text-subtitle-1">{{ message?.text }}</span>

    <!-- Close Button -->
    <template v-slot:actions>
      <v-btn @click="closeMessage" density="compact" icon="mdi-close"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed, watch, ref} from 'vue';
import { useMessageStore } from '@/stores/messageStore';

const messageStore = useMessageStore();
const message = computed(() => messageStore.message);

const isSnackbarVisible = ref(false);

// Watch for message changes to trigger snackbar
watch(message, (newMessage) => {
  if (newMessage) {
    isSnackbarVisible.value = true;
  }
});

const closeMessage = () => {
  isSnackbarVisible.value = false;
  setTimeout(() => {
    messageStore.clearMessage();
  }, 300);
};

// Dynamic color based on message type
const messageColor = computed(() => {
  if (message.value?.type === 'success') return '#43A047';
  if (message.value?.type === 'error') return '#E53935';
  if (message.value?.type === 'warning') return '#FDD835';
  return 'blue';
});
</script>
