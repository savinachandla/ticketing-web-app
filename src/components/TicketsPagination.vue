<template>
  <v-container class="d-flex justify-center mt-4">
    <v-pagination 
      :model-value="currentPage" 
      @update:modelValue="updatePage"
      rounded="circle" 
      color="primary" 
      :length="totalPages"
      :total-visible="7"
    >
    </v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { totalPages, currentPage } = defineProps({
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, required: true }
});

const emit = defineEmits(['update:currentPage']);

const updatePage = (page: number) => {
  emit('update:currentPage', page); // Emit event to update parent state
};
</script>
