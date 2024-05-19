<script setup lang="ts">
import { KakaoMap } from 'vue3-kakao-maps';
import DiceComponent from '@/components/game/dice/DiceComponent.vue';
import { ref } from 'vue';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

</script>

<template>
<div class="center">
    <DiceComponent />
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" style="grid-column: 1/12;grid-row: 1/12;" :width="'100%'" :height="'100%'"/>
</div>
</template>

<style scoped>
.center {
    position: relative;
}
</style>