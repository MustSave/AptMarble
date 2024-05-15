<script setup lang="ts">
import type { BoardSpaceProperty } from 'env';

const props = defineProps({
    data: {
        type: Object as () => BoardSpaceProperty,
        required: true,
    }
});
</script>

<template>
    <div class="container">
        <div class="instructions">{{ props.data?.instruction }}</div>
        <div class="go-word">{{ props.data?.name }}</div>
    </div>
    <div class="arrow fa fa-long-arrow-left"></div>
</template>

<style scoped>
.instructions {
    position: absolute;
}
</style>