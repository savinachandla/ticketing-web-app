<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="pa-3">
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this ticket?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="grey" @click="closeDialog">Cancel</v-btn>
          <v-btn color="red-darken-2" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineEmits, ref } from "vue";
  
  const dialog = ref(false);
  const emit = defineEmits(["confirm", "cancel"]);
  
  const openDialog = () => {
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  const confirmDelete = () => {
    emit("confirm");
    closeDialog();
  };
  
  defineExpose({ openDialog });
  </script>
  