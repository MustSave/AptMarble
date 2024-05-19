<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
</script>

<template>
  <v-app style="background: none;">
    <HeaderComponent />
    <RouterView />
  </v-app>
</template>

<style scoped>
</style>
