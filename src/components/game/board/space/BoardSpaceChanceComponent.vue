<script setup lang="ts">
import type { BoardSpaceProperty } from 'env';
import BoardSpaceComponent from './BoardSpaceComponent.vue';

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
<BoardSpaceComponent :data="props.data" :index="props.index" >
    <div class="container">
        <div class="name">{{ props.data.name }}</div>
        <i class="drawing fa fa-question"></i>
    </div>
</BoardSpaceComponent>
</template>

<style scoped>

</style>