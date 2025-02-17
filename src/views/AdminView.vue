<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-xl font-semibold">
        Existing Tickets 
        <span class="ml-2 px-3 py-1 bg-primary text-subtitle-1 text-white rounded-lg">{{ tickets.length }}</span>
      </h2>
      <v-btn @click="openTicketForm" color="primary">
        Create Ticket
      </v-btn>
    </div>

    <div v-if="paginatedTickets.length" class="mt-4">
      <v-row>
        <v-col
          v-for="ticket in paginatedTickets"
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

    <!-- Pagination Component -->
    <TicketsPagination
      v-if="tickets.length > itemsPerPage"
      :totalPages="totalPages"
      v-model:currentPage="currentPage"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTicketStore } from '@/stores/ticketStore';
import TicketCard from '@/components/TicketCard.vue';
import TicketDialog from '@/components/dialogs/TicketDialog.vue';
import TicketsPagination from '@/components/TicketsPagination.vue';

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

//Pagination
const itemsPerPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(tickets.length / itemsPerPage) || 1);
// Compute tickets to display based on pagination
const paginatedTickets = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return tickets.slice(startIndex, startIndex + itemsPerPage);
});
</script>
