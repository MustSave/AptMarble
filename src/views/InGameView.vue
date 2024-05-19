<script setup lang="ts">
import BoardCenterComponent from '@/components/game/board/BoardCenterComponent.vue';
import BoardRowComponent from '@/components/game/board/BoardRowComponent.vue';
import BoardCornerComponent from '@/components/game/board/space/corner/BoardCornerComponent.vue';
import PlayerComponent from '@/components/game/player/PlayerComponent.vue';
import { GameClient } from '@/scripts/stomp';
import { useGameStore } from '@/stores/gameStore';
import { useThreeStore } from '@/stores/threeStore';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    gameClient: {
        type: GameClient,
        required: true,
    }
});

const canvas = ref(null as unknown as HTMLCanvasElement);
watch(canvas, (cur) => {
    if (!cur) return;

    const threeStore = useThreeStore();
    threeStore.initThreeJs(canvas.value, 50);
});

const gameStore = useGameStore();
const rowBottom = computed(() => {
    return gameStore.spaceData.slice(1, 10).reverse();
});
const rowLeft = computed(() => {
    return gameStore.spaceData.slice(11, 20).reverse();;
});
const rowTop = computed(() => {
    return gameStore.spaceData.slice(21, 30);
});
const rowRight = computed(() => {
    return gameStore.spaceData.slice(31, 40);
});
</script>

<template>
<div class="board">
    <canvas id="threeCanvas" ref="canvas"></canvas>
    <BoardCenterComponent />

    <!-- 하 -->
    <BoardCornerComponent :data="gameStore.spaceData[0]" :index="0"/>
    <BoardRowComponent :class="{ 'horizontal-row': true, 'bottom-row': true }" :space-data-list="rowBottom" :start-index="1" :reversed="true"/>
    <!-- 좌 -->
    <BoardCornerComponent :data="gameStore.spaceData[10]" :index="10"/>
    <BoardRowComponent :class="{ 'vertical-row': true, 'left-row': true }" :space-data-list="rowLeft" :start-index="11" :reversed="true"/>
    <!-- 상 -->
    <BoardCornerComponent :data="gameStore.spaceData[20]" :index="20"/>
    <BoardRowComponent :class="{ 'horizontal-row': true, 'top-row': true }" :space-data-list="rowTop" :start-index="21"/>
    <!-- 우 -->
    <BoardCornerComponent :data="gameStore.spaceData[30]" :index="30"/>
    <BoardRowComponent :class="{ 'vertical-row': true, 'right-row': true }" :space-data-list="rowRight" :start-index="31"/>
    
    <PlayerComponent :position="'top-left'"/>
    <PlayerComponent :position="'bottom-right'"/>
</div>
</template>

<style scoped>
.board {
    /* margin-top: 100px; */
    margin: auto;
    z-index: 2;
    height: fit-content;
}
canvas {
    top: -30px;
    position:absolute;
    width: 100%;
    height: 100%;
    z-index: 100000;
    pointer-events: none;
}
</style>