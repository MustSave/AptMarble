<script setup lang="ts">

const props = defineProps({
    class: {
        type: [Object, String],
    }
});
</script>

<template>
<div class="space" :class="props.class">
    <slot></slot>
</div>
</template>

<style scoped>

</style>