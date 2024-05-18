<template>
    <div class="match-making">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="pa-4" max-width="900" width="100%">
        <v-card-title class="text-h4 text-center">Game Matching</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field
              v-model="nickname"
              label="Nickname"
              required
              :rules="nicknameRules"
              :disabled="isMatching"
              outlined
            ></v-text-field>
            <v-btn v-show="!isMatching" :disabled="!formValid || isMatching" @click="requestMatch" color="primary" block>
              Request Match
            </v-btn>
            <v-btn v-show="isMatching" @click="cancelMatch" color="error" block>
              Cancel Match
            </v-btn>
            <div v-if="isMatching" class="mt-4 d-flex justify-center">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
            <div v-if="statusMessage" class="mt-4 text-center text-h6">
              {{ statusMessage }}
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
</div>
  </template>
  
  <script setup>
import router from '@/router';
import { GameClient } from '@/scripts/stomp';
import { ref } from 'vue';

const props = defineProps({
    gameClient: {
        type: GameClient,
        required: true,
    }
});
  // State variables
  const nickname = ref('');
  const formValid = ref(false);
  const isMatching = ref(false);
  const statusMessage = ref('');
  
  // Validation rules for the nickname
  const nicknameRules = [
    v => !!v || 'Nickname is required',
    v => (v && v.length >= 3) || 'Nickname must be at least 3 characters'
  ];
  
  // Method to handle match request
  const requestMatch = () => {
    if (formValid.value) {
      isMatching.value = true;
      statusMessage.value = 'Finding a match...';
  
      // Simulate matchmaking process
      setTimeout(() => {
        if (isMatching.value) {
          statusMessage.value = 'Match found!';
          isMatching.value = false;

          setTimeout(() => {
            router.push({ name: 'ingame', params: { roomId: 'aa' }});
          }, 1000);
        }
      }, 5000); // Simulated matchmaking delay
    }
  };
  
  // Method to cancel match request
  const cancelMatch = () => {
    isMatching.value = false;
    statusMessage.value = 'Matchmaking cancelled.';
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
