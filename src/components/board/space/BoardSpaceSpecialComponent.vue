<script setup lang="ts">
/* __placeholder__ */
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
<BoardSpaceComponent :class="props.data.class">
    <div class="container">
        <div class="name">{{ props.data.name }}</div>
        <i class="drawing fa" :class="props.data.class"></i>
        <div class="price" v-if="props.data.price">{{ props.data.price }}</div>
        <div class="instructions" v-if="props.data.instruction">{{ props.data.instruction }}</div>
    </div>
</BoardSpaceComponent>
</template>

<style scoped>
.name {
    margin-top: 20px;
}
.instructions {
    font-size: 8px;
}
</style>