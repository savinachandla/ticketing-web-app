<template>
  <div class="p-6">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-xl font-semibold">Existing Tickets</h2>
      <v-btn @click="openTicketForm" color="primary">
        Create Ticket
      </v-btn>
    </div>

    <div v-if="tickets.length" class="mt-4">
      <v-row>
        <v-col
          v-for="ticket in tickets"
          :key="ticket.id"
          cols="12"
          sm="12"
          md="12"
        >
          <TicketCard :ticket="ticket" :isAdmin="true" />
        </v-col>
      </v-row>
    </div>
    <p v-else class="mt-4 text-gray-500">No tickets available.</p>

    <!-- Ticket Form Dialog -->
    <TicketDialog :modelValue="dialogVisible" @closeDialog="closeTicketForm"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTicketStore } from '@/stores/ticketStore';
import TicketCard from '@/components/TicketCard.vue';
import TicketDialog from '@/components/dialogs/TicketDialog.vue';

const ticketStore = useTicketStore();
const tickets = ticketStore.tickets;

// Dialog control
const dialogVisible = ref(false);

// Methods to control dialog visibility
const openTicketForm = () => {
  dialogVisible.value = true;
};
const closeTicketForm = () => {
  dialogVisible.value = false;
};
</script>
