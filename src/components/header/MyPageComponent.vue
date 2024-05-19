<template>
<v-menu open-on-hover offset-y>
  <template v-slot:activator="{ props }">
    <v-btn color="black" v-bind="props">
      My Page
    </v-btn>
  </template>
  <v-list>
    <v-list-item @click="goToModifyInfo">
      <v-list-item-title>Modify Info</v-list-item-title>
    </v-list-item>
    <v-list-item @click="goToManageApartment">
      <v-list-item-title>Manage Apartment</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</template>

<script setup lang="ts">
const items = ['1', '2', '3'];

const goToModifyInfo = () => {
  // Navigate to modify info page
  console.log('Navigating to Modify Info');
};

const goToManageApartment = () => {
  // Navigate to manage apartment page
  console.log('Navigating to Manage Apartment');
};
</script>