<script setup>
import DiceBox from '@3d-dice/dice-box-threejs';
import { computed, onMounted, watch } from 'vue';

const props = defineProps({
    diceResult: {
        type: Array,
        default: [],
    }
});

const diceResult = computed(() => props.diceResult);

onMounted(() => {
    const Box = new DiceBox('#dice-container', {
        light_intensity: 1,
        gravity_multiplier: 600,
        baseScale: 100,
        strength: 0.3,
    });

    const rollDice = (...nums) => {
        Box.roll(`${nums.length}d6@${nums.join(',')}`)
            .then(() => setTimeout(() => Box.clearDice(), 1000));
    }

    Box.initialize().then(() => {
        watch(diceResult, (nv, ov) => {
            console.log(nv, ov);
            rollDice(...nv);
        });
    });
})
</script>

<template>
<div id="dice-container" class="dice-container"></div>
</template>

<style scoped>
.dice-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
}
</style>