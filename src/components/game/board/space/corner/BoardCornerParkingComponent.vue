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
        <div class="name">{{ props.data.name }}</div>
    </div>
</template>

<style scoped>
</style>