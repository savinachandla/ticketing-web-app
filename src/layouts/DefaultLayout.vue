<template>
  <v-app class="app-background">
    <!-- App Bar -->
    <AppHeader/>
    <!-- Global Notification Bar-->
    <NotificationBar />
    <!--Main Content Area-->
    <v-main>
      <v-container class="content">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import { ref } from 'vue';

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Cart", to: "/cart" },
  { label: "Admin", to: "/admin" },
];
</script>

<style scoped>
.app-background {
  background-color: #f4f4f4;
  min-height: 100vh;
}

.content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
