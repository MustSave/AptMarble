<script setup lang="ts">
import { Player } from '@/scripts/player';
import { defineProps, toRef, watch } from 'vue';

const props = defineProps({
  connected: Boolean,
  message: {
    type: String,
    default: '',
  }
});

const player = new Player();
player.init().then(p => p.moveToSpace(3).then(() => p.moveToSpace(0, 10)));

watch(() => props.message, nv => {
    try {
        const data = JSON.parse(nv.trim());
        if (data['func'] === 'moveTo') {
            player.moveToSpace(Number(data['data']));
        } else if (data['func'] === 'buy') {
            player.buy(Number(data['data']));
        }
    } catch(e) {
        console.error(e);
    }
});
</script>

<template>

</template>

<style scoped>

</style>