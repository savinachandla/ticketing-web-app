<template>
  <v-container height="100vh">
    <v-row>
      <v-col cols="12" md="8">
        <TicketList />
      </v-col>

      <v-col cols="12" md="4">
        <CheckoutSection />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TicketList from '@/components/TicketList.vue';
import CheckoutSection from '@/components/CheckoutSection.vue';
</script>
