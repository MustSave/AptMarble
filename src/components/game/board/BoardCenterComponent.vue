<script setup lang="ts">
import { KakaoMap } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>

<template>
<div class="center">
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" style="grid-column: 1/12;grid-row: 1/12;" :width="'100%'" :height="'100%'"/>
    <!-- <h1 class="title">
        여기에 지도
    </h1>
    <div class="chance-deck">
        <h2 class="label">CARD</h2>
        <div class="deck"></div>
    </div> -->
</div>
</template>