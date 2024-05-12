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
        <div class="color-bar" :class="props.data.class"></div>
        <div class="name">{{ props.data.name }}</div>
        <div class="price">{{  props.data.price }}</div>
    </div>
</BoardSpaceComponent>
</template>

<style scoped>
.name {
    padding-bottom: 0px;
}
.price {
    font-size: 9px;
}
</style>