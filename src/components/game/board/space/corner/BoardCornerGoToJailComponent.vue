<script setup lang="ts">
import type { BoardSpaceProperty } from 'env';
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object as () => BoardSpaceProperty,
        required: true,
    }
});

const a = computed(() => {
    return props.data.name.split('\n');
});
</script>

<template>
    <div class="container">
        <div class="name">
            <template v-for="(z, i) in a" :key="i">
                {{ z }}
                <br v-if="i < a.length"/>
            </template>
        </div>
        <i class="drawing fa fa-gavel"></i>
        <div class="instruction">{{ props.data.instruction }}</div>
    </div>
</template>

<style scoped>
</style>