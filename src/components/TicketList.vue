<template>
    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Shopping Cart</v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-table v-if="cart.length > 0" dense>
        <thead>
          <tr>
            <th class="text-left text-h6 font-weight-bold">Name</th>
            <th class="text-left text-h6 font-weight-bold">Price</th>
            <th class="text-left text-h6 font-weight-bold">Quantity</th>
            <th class="text-left text-h6 font-weight-bold">Subtotal</th>
            <th class="text-left text-h6 font-weight-bold"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              <strong>{{ item.name }}</strong>
              <p class="text-caption">{{ item.description }}</p>
            </td>
            <td>${{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <!-- <td>
              <v-text-field 
                variant="outlined" 
                v-model="item.quantity" 
                type="number" 
                min="1" 
                :max="item.count" 
                class="mt-4" 
                density="compact" 
                @blur="updateQuantity(item)">
              </v-text-field>
            </td> -->
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
            <v-tooltip text="Remove a ticket from cart" location="top">
							<template v-slot:activator="{ props }">
								<v-btn 
										density="comfortable" 
										color="error" 
										icon 
										v-bind="props" 
										@click="removeFromCart(item)"
								>
										<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
            </v-tooltip>
            </td>

          </tr>
        </tbody>
      </v-table>
  
      <v-alert v-else type="info" color="#2979FF" class="mt-4">Your cart is empty.</v-alert>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from '@/stores/cartStore';
  
  const cartStore = useCartStore();
  const cart = cartStore.cart;
  
  const removeFromCart = (ticket: any) => {
    cartStore.removeFromCart(ticket);
  };

//   const updateQuantity = (item: any) => {
//     if (item.quantity < 1) {
//       item.quantity = 1; // Prevent going below 1
//     } else if (item.quantity > item.count) {
//       item.quantity = item.count; // Prevent exceeding available count
//     }
//     item.count = item.count-item.quantity;
//     console.log('item', item)
//     // If the quantity is changed, update the store accordingly
//     cartStore.removeFromCart(item); 
//     cartStore.addToCart(item);
//   };
  </script>
  