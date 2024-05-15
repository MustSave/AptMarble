<template>
    <div class="modal">
        <h2>{{ space.name }}</h2>
        <p>Type: {{ space.type }}</p>
        <p v-if="space.price">Price: {{ space.price }}</p>
        <p v-if="space.instruction">Instruction: {{ space.instruction }}</p>
        <button @click="closeModal">Close</button>
    </div>
</template>
  
  <script setup>
    defineProps({
        space: {
            type: Object,
            required: true
        }
    })
    closeModal() {
        this.$emit('close');
    }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  