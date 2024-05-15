<script setup lang="ts">
import BoardCenterComponent from '@/components/game/board/BoardCenterComponent.vue';
import BoardCornerComponent from '@/components/game/board/space/corner/BoardCornerComponent.vue';
import BoardRowComponent from '@/components/game/board/BoardRowComponent.vue';
import DebugSocketComponent from '@/components/debug/DebugSocketComponent.vue';
import { useThreeStore } from '@/stores/threeStore';
import { computed, watch } from 'vue';
import { ref } from 'vue';
import PlayerComponent from '@/components/game/player/PlayerComponent.vue';
import { useGameStore } from '@/stores/gameStore';
import SockJS from 'sockjs-client/dist/sockjs.js';
import { useSkybox } from '@/scripts/skybox';

const canvas = ref(null as unknown as HTMLCanvasElement);
useSkybox('src/assets/cubemap/christmas');

watch(canvas, (cur) => {
    if (!cur) return;

    const threeStore = useThreeStore();
    threeStore.initThreeJs(canvas.value, 50);
    // threeStore.useOribitController();
    console.log(threeStore.$state);
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

const socket = new SockJS('http://localhost:8080/ws'); // 웹소켓 엔드포인트 주소 입력
const connected = ref(false);
const message = ref('');

// // 연결 이벤트 핸들러
socket.onopen = () => {
    console.log('WebSocket connected');
    connected.value = true;
};

// // 메시지 수신 이벤트 핸들러
socket.onmessage = (event) => {
    message.value = event.data;
};

// // 연결 종료 이벤트 핸들러
socket.onclose = () => {
    console.log('WebSocket disconnected');
    connected.value = false;
    gameStore.reset();
};
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
        
        <PlayerComponent :message="message" :connected="connected"/>
    </div>
    <DebugSocketComponent :message="message" :connected="connected" />
</template>

<style scoped>
.board {
    position: relative;
    z-index: 2;
}
canvas {
    top: calc(-5%);
    position:absolute;
    width: 100%;
    height: calc(110%);
    z-index: 100000;
    pointer-events: none;
}
</style>

<style>
.instruction {
    overflow: hidden;
}
</style>