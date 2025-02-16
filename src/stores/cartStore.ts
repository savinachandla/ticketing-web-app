import { defineStore } from 'pinia';
import type { Ticket } from '@/types/ticket';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref<Ticket[]>([]);

  const addToCart = (ticket: Ticket) => {
    const existingTicket = cart.value.find(item => item.id === ticket.id);
    if (existingTicket) {
      // Only increase quantity if it's less than count (availability)
      if (existingTicket.quantity < existingTicket.count) {
        existingTicket.quantity += 1;
      }
    } else {
      cart.value.push({ ...ticket, quantity: 1 });
    }
  };

  // Remove ticket from the cart
  const removeFromCart = (ticket: Ticket) => {
    const existingTicket = cart.value.find(item => item.id === ticket.id);
    if (existingTicket) {
      if (existingTicket.quantity > 1) {
        existingTicket.quantity -= 1;
      } else {
        cart.value.splice(cart.value.indexOf(existingTicket), 1);
      }
    }
  };

  // Calculate total price
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  // Compute total number of items in the cart
  const itemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  return { cart, addToCart, removeFromCart, totalPrice, itemCount };
});
