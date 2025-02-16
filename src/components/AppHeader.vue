<template>
  <v-app-bar :elevation="2" color="blue-darken-4">
    <v-container class="d-flex align-center justify-space-between">
      <!-- Left Section: Logo and Menu -->
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img :src="logoImage" alt="Ticket Hub" min-height="40" min-width="150" class="mr-4" />
        </router-link>

        <!-- Desktop Navigation -->
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn v-for="(item, index) in menuItems" :key="index" :to="item.to" variant="text" class="text-white text-subtitle-1">
            {{ item.label }}
          </v-btn>
        </v-toolbar-items>
      </div>

      <!-- Right Section: Cart Button with Tickets count -->
      <v-btn to="/cart" class="text-none" stacked v-if="cartItemCount > 0">
        <v-badge color="error" :content="cartItemCount">
          <v-icon size="30" color="white">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn v-else>
        <v-icon size="30" color="white">mdi-cart</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class="d-md-none text-white" @click="toggleMobileMenu" />
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="isMobileMenuOpen" location="right" temporary>
    <v-list>
      <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.to">
        {{ item.label }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import logoImage from '@/assets/ticket-hub-logo.png';
import { useCartStore } from '@/stores/cartStore';

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.itemCount)

const menuItems = [
  { label: "Tickets", to: "/" },
  { label: "Admin", to: "/admin" },
  { label: "Cart", to: "/cart" }
];
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
