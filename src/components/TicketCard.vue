<template>
  <v-container class="d-flex justify-center">
    <v-card
      class="w-100 px-6 py-4 rounded-lg"
      elevation="2"
      :class="{ 'vip-card': ticket.isVIP }"
    >
      <v-row justify="space-between">
        <!-- Ticket Name -->
        <v-col cols="12" sm="3">
          <p class="text-body-2 text-grey-darken-1">Ticket</p>
          <h3 class="text-h6 font-weight-bold" :class="{ 'vip-text': ticket.isVIP }">
            {{ ticket.name }}
            <v-chip v-if="ticket.isVIP" append-icon="mdi-star" class="ma-2" color="blue-darken-2">
              VIP
            </v-chip>
          </h3>
        </v-col>

        <!-- Availability -->
        <v-col cols="12" sm="3" class="d-flex align-center">
          <p class="text-body-2"><strong>Available:</strong> {{ ticket.count }}</p>
        </v-col>

        <!-- Price -->
        <v-col cols="12" sm="3" class="text-md-right text-sm-left">
          <p class="text-body-2 text-grey-darken-1">Price</p>
          <h3 class="text-h6 font-weight-bold">${{ ticket.price }}</h3>
        </v-col>
      </v-row>

      <!-- Ticket Description & Action Button -->
      <v-row class="mt-3 pa-3 mb-2 rounded-lg" :class="{ 'vip-bg': ticket.isVIP, 'bg-grey-lighten-3': !ticket.isVIP }">
        <v-col cols="12" sm="8">
          <p class="text-body-2 font-weight-medium">{{ ticket.description }}</p>
        </v-col>
        <v-col cols="12" sm="4" class="text-right">
          <v-btn
            v-if="!isAdmin"
            :color="ticket.isVIP ? 'blue-accent-3' : 'green-darken-2'"
            class="text-white font-weight-bold"
            @click="addToCart(ticket)"
          >
            Buy Tickets
          </v-btn>
          <v-btn v-if="isAdmin" class="ml-4" color="red-darken-2" @click="openDeleteDialog">
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <DeleteConfirmationDialog ref="deleteDialog" @confirm="deleteTicket" />
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useTicketStore } from '@/stores/ticketStore';
import { useMessageStore } from '@/stores/messageStore';
import DeleteConfirmationDialog from '@/components/dialogs/DeleteConfirmationDialog.vue';
import { Ticket } from '@/types/ticket'; 

const cartStore = useCartStore();
const ticketStore = useTicketStore();
const messageStore = useMessageStore();
const deleteDialog = ref();

const { ticket, isAdmin } = defineProps<{
  ticket: Ticket;
  isAdmin: boolean;
}>();

const addToCart = (ticket: any) => {
  if (ticket.count > 0) {
    ticket.count -= 1;
    cartStore.addToCart(ticket);
    messageStore.setMessage('Ticket added to cart', 'success');
  } else {
    messageStore.setMessage('No more tickets available', 'error');
  }
};
const openDeleteDialog = () => {
  deleteDialog.value.openDialog();
};

const deleteTicket = () => {
  ticketStore.removeTicket(ticket);
  messageStore.setMessage('Ticket deleted successfully', 'error');
};
</script>


<style scoped>
.vip-card {
  border: 2px solid #2196f3;
  box-shadow: 0px 4px 10px rgba(33, 150, 243, 0.4);
}

.vip-text {
  color: #1565c0;
}

.vip-bg {
  background: linear-gradient(to right, #e3f2fd, #bbdefb);
}
</style>