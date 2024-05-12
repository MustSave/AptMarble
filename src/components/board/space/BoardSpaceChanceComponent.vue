<script setup lang="ts">
import type { BoardSpaceProperty } from 'env';
import BoardSpaceComponent from './BoardSpaceComponent.vue';

const props = defineProps({
    data: {
        type: Object as () => BoardSpaceProperty,
        required: true,
    }
});
</script>

<template>
<BoardSpaceComponent :class="props.data.class" >
    <div class="container">
        <div class="name">{{ props.data.name }}</div>
        <i class="drawing fa fa-question"></i>
    </div>
</BoardSpaceComponent>
</template>

<style scoped>

</style>