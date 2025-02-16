<template>
  <v-dialog v-model="dialogVisible" max-width="800px">
    <v-card class="pa-6">
      <v-card-title class="headline font-weight-bold">
        Create New Ticket
      </v-card-title>
      <v-divider class="pa-0"/>
      <v-card-text>
        <TicketForm @closeTicketDialog="cancelForm"/>
      </v-card-text>
      <v-btn class="mx-6" color="primary" @click="cancelForm">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import TicketForm from '@/components/forms/TicketForm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['closeDialog'])
const dialogVisible = computed(() => {
	return props.modelValue
})

const cancelForm = () => {
	emit('closeDialog')
};

</script>

