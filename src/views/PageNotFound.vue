<template>
  <v-container fluid class="not-found-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <v-icon size="100" color="white">mdi-alert-circle-outline</v-icon>
        <p class="text-h5 text-white">Oops! The page you are looking for doesn't exist.</p>
        <v-btn class="mt-6" color="white" variant="outlined" to="/">Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.not-found-container {
  background-color: rgba(13, 71, 161, 0.8);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
