<template>
  <div>
    <v-app-bar app color="grey-lighten-5" dark>
      <v-toolbar-title>
        <span class="font-weight-light">Apart Marble</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isLoggedIn">
        <v-btn @click="login" color="black">Login</v-btn>
      </div>
      <div v-else>
        <v-btn @click="logout" color="black">Logout</v-btn>
        <my-page-component></my-page-component>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyPageComponent from '@/components/header/MyPageComponent.vue';

const isLoggedIn = ref(false);

const login = () => {
  isLoggedIn.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
};

</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.match-making {
  z-index: 2;
  min-width: 600px;
}
</style>
