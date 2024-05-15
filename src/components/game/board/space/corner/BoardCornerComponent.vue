<script setup lang="ts">
import type { BoardSpaceProperty } from 'env';
import BoardSpaceComponent from '@/components/game/board/space/BoardSpaceComponent.vue';
import BoardCornerGoComponent from './BoardCornerGoComponent.vue';
import BoardCornerJailComponent from './BoardCornerJailComponent.vue';
import BoardCornerParkingComponent from './BoardCornerParkingComponent.vue';
import BoardCornerGoToJailComponent from './BoardCornerGoToJailComponent.vue';

const props = defineProps({
    data: {
        type: Object as () => BoardSpaceProperty,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
});
</script>

<template>
    <BoardSpaceComponent :data="props.data" :index="props.index">
        <BoardCornerGoComponent v-if="props.data.type === 'go'" :data="props.data"/>
        <BoardCornerJailComponent v-if="props.data.type === 'jail'" :data="props.data"/>
        <BoardCornerParkingComponent v-if="props.data.type === 'parking'" :data="props.data"/>
        <BoardCornerGoToJailComponent v-if="props.data.type === 'gotojail'" :data="props.data"/>
    </BoardSpaceComponent>
</template>

<style scoped>
.jail {
    display: block;
}
.jail .container {
    justify-content: center;
}
.corner {
    overflow: hidden;
}
</style>