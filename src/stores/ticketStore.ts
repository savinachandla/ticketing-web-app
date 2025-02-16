import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ticket } from '@/types/ticket';
import mockTickets from '@/mock/mockTickets.json';  // Import the mock tickets data

export const useTicketStore = defineStore('ticketStore', () => {
  const tickets = ref<Ticket[]>(mockTickets);

  //Add new ticket
  const addTicket = (ticket: Ticket) => {
    tickets.value.push(ticket);
  };

  // Remove a ticket by its ID
  const removeTicket = (ticket: Ticket) => {
    const index = tickets.value.findIndex(originalTicket => originalTicket.id === ticket.id);
    if (index !== -1) {
      tickets.value.splice(index, 1);
    }
  };

  return { tickets, addTicket, removeTicket };
});
