<script setup lang="ts">
import type { BoardCornerData } from 'env';
import BoardSpaceComponent from './space/BoardSpaceComponent.vue';

const props = defineProps({
    data: {
        type: Object as () => BoardCornerData,
        required: true,
    }
});
</script>

<template>
<BoardSpaceComponent :class="props.data.class">
    <slot></slot>
</BoardSpaceComponent>
</template>

<style scoped>
.jail {
    display: block;
}

</style>