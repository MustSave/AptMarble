<template>
  <div class="socket-status" :class="{ 'connected': connected }">
    <p v-if="connected">WebSocket connected</p>
    <p v-else>WebSocket disconnected</p>
    <div class="message-container">
      <p>Received Message:</p>
      <div class="message" :class="{ 'expanded': message.length > 20 }">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  connected: Boolean,
  message: String
});
</script>

<style scoped>
.socket-status {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 2;
}

.socket-status.connected {
  background-color: lightgreen;
}

.message-container {
  margin-top: 5px;
}

.message {
  max-width: 200px; /* 최대 너비 지정 */
  word-wrap: break-word; /* 긴 단어를 줄 바꿈 */
}

.message.expanded {
  white-space: pre-wrap; /* 줄 바꿈이 필요한 경우 줄 바꿈 */
}
</style>
