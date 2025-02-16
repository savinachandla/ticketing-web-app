<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="ticket.name"
      :counter="20"
      :rules="nameRules"
      label="Ticket Name"
      variant="outlined"
      class="mt-required"
      color="primary"
    ></v-text-field>

    <v-textarea
      v-model="ticket.description"
      counter="100"
      label="Description"
      variant="outlined"
      :rules="descriptionRules"
      required
      class="mt-required"
      color="primary"
    ></v-textarea>

    <v-checkbox
      v-model="ticket.isVIP"
      label="VIP Ticket"
      color="primary"
    ></v-checkbox>

    <v-text-field
      v-model="ticket.count"
      variant="outlined"
      label="Number of Tickets Available"
      type="number"
      min="1"
      max="1000"
      :rules="countRules"
      required
      class="mt-required"
      color="primary"
    ></v-text-field>

    <v-text-field
      v-model="ticket.price"
      label="Price"
      variant="outlined"
      type="number"
      min="1"
      max="500"
      :rules="priceRules"
      required
      class="mt-required"
      color="primary"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Add Ticket
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTicketStore } from '@/stores/ticketStore';
import { useMessageStore } from '@/stores/messageStore';
import { VForm } from 'vuetify/components';

//for closing the dialog upon ticket creation
const emit = defineEmits(['closeTicketDialog'])

const ticketStore = useTicketStore()
const messageStore = useMessageStore()
const form = ref<VForm | null>(null); 
const valid = ref(false);

const ticket = ref({
  name: '',
  description: '',
  isVIP: false,
  count: 1,
  price: 1,
  quantity: 0
});

const nameRules = [
  (v: string) => !!v || "Ticket name is required",
  (v: string) => (v && v.length >= 3 && v.length <= 20) || "Ticket name must be 3-20 characters long"
];

const descriptionRules = [
  (v: string) => !!v || "Description is required",
  (v: string) => (v.length <= 100) || "Description cannot exceed 100 characters"
];

const countRules = [
  (v: number) => v > 0 || "Number of tickets must be greater than 0",
  (v: number) => v <= 1000 || "Cannot exceed 1000 tickets"
];

const priceRules = [
  (v: number) => v > 0 || "Price must be greater than 0",
  (v: number) => v <= 500 || "Price cannot exceed $500"
];

const validate = async () => {
  if (form.value) {
    const { valid: formValid } = await form.value.validate();
    if (formValid) {
      //saving ticket to store
      ticketStore.addTicket({ id: Date.now(), ...ticket.value });
      messageStore.setMessage('Ticket created successfully', 'success');
      reset();
      emit('closeTicketDialog');
    }
  }
};

const reset = () => {
  ticket.value = { name: '', description: '', isVIP: false, count: 1, price: 1, quantity: 0 };
  if(form.value)
    form.value.resetValidation();
};
</script>

<style>
.mt-required {
  margin-top: 10px;
}
</style>
