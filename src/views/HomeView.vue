<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h5 font-weight-bold mb-4">Available Tickets</h1>
      </v-col>
    </v-row>

    <v-row v-if="tickets.length">
      <v-col
        v-for="ticket in tickets"
        :key="ticket.id"
        cols="12"
      >
        <TicketCard :ticket="ticket" :isAdmin="false" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <p class="text-body-1">No tickets available.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/ticketStore';
import TicketCard from '@/components/TicketCard.vue';

const ticketStore = useTicketStore();
const tickets = ticketStore.tickets;
</script>
