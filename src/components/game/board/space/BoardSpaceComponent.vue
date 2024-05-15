<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useThreeStore } from '@/stores/threeStore';
import { useGameStore } from '@/stores/gameStore';
import type { BoardSpaceProperty } from 'env';
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

const dialog = ref(false);

const threeStore = useThreeStore();
const threeReady = computed(() => threeStore.checkThreeReady);
watch(threeReady, () => {
    const pos = threeStore.getPositionCenterOfElem(targetElement.value);
    useGameStore().setPositionAt(props.index, pos);
});

const targetElement = ref(null as unknown as HTMLElement);

const onClick = () => {
    console.log(props.data);
    dialog.value=true;
}
</script>

<template>
<div class="space" :class="props.data.class" ref="targetElement" @click="onClick">
    <slot></slot>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ data.name }}
        </v-card-title>
        <v-card-text>
          Type: {{ data.type }}<br>
          Price: {{ data.price || 'N/A' }}<br>
          Instruction: {{ data.instruction || 'N/A' }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<style scoped>

</style>