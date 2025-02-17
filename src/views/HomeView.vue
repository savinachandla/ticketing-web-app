<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h5 font-weight-bold mb-4">Available Tickets</h1>
      </v-col>
    </v-row>

    <v-row v-if="paginatedTickets.length">
      <v-col v-for="ticket in paginatedTickets" :key="ticket.id" cols="12">
        <TicketCard :ticket="ticket" :isAdmin="false" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <p class="text-body-1">No tickets available.</p>
      </v-col>
    </v-row>
    
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
import TicketsPagination from '@/components/TicketsPagination.vue';

const ticketStore = useTicketStore();
const tickets = ticketStore.tickets;

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
