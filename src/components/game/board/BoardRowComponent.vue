<script setup lang="ts">
import BoardSpacePropertyComponent from './space/BoardSpacePropertyComponent.vue';
import BoardSpaceSpecialComponent from './space/BoardSpaceSpecialComponent.vue';
import BoardSpaceChanceComponent from './space/BoardSpaceChanceComponent.vue';
import type { BoardSpaceProperty } from 'env';

const props = defineProps({
    class: {
        type: [Object, String],
        default: { 'horizontal-row': true, 'bottom-row': true }
    },
    spaceDataList: {
        type: Array<BoardSpaceProperty>,
        required: true,
    },
    startIndex: {
        type: Number,
        required: true,
    },
    reversed: {
        type: Boolean,
        default: false,
    }
});
</script>

<template>
<div class="row" :class="props.class">
    <template v-for="(data, index) in props.spaceDataList">
        <BoardSpacePropertyComponent v-if="data.type === 'property'" :data="data" :key="data.name" :index="startIndex + (props.reversed ? props.spaceDataList.length-1-index : index)"/>
        <BoardSpaceSpecialComponent v-if="data.type === 'special'" :data="data" :key="data.name" :index="startIndex + (props.reversed ? props.spaceDataList.length-1-index : index)"/>
        <BoardSpaceChanceComponent v-if="data.type === 'chance'" :data="data" :key="data.name" :index="startIndex + (props.reversed ? props.spaceDataList.length-1-index : index)"/>
    </template>
</div>
</template>

<style scoped>

</style>