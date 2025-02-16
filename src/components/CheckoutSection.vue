<template>
    <v-card class="pa-4" elevation="2">
      <v-card-title class="text-h6 font-weight-bold">Cart Totals</v-card-title>
      <v-divider class="mb-2"></v-divider>
      <v-card-text>
        <v-container>
            <v-row>
							<v-col cols="6" class="px-0"><strong>Subtotal:</strong></v-col>
							<v-col cols="6" class="text-right px-0">${{ totalPrice }}</v-col>
            </v-row>
            <v-row>
							<v-col cols="6" class="px-0"><strong>Taxes:</strong></v-col>
							<v-col cols="6" class="text-right px-0 text-green-700">No Taxes</v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row>
							<v-col cols="6" class="px-0"><strong>Total:</strong></v-col>
							<v-col cols="6" class="text-right px-0 font-weight-bold">${{ totalPrice }}</v-col>
            </v-row>
        </v-container>
      </v-card-text>

      <v-divider class="mb-4"></v-divider>

      <v-btn prepend-icon="mdi-credit-card-outline" block color="primary">
				Checkout
			</v-btn>

			<v-btn prepend-icon="mdi-wallet-outline" block color="yellow" class="mt-4">
				Pay with PayPal
			</v-btn>

			<v-btn prepend-icon="mdi-contactless-payment" block color="error" class="mt-4">
				Amazon Pay
			</v-btn>

    </v-card>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  
  const cartStore = useCartStore();
  const totalPrice = computed(() => cartStore.totalPrice)
  </script>
  