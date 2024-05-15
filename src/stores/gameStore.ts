import { tmpData } from "@/scripts/spaceData";
import { defineStore } from "pinia";
import { Vector3 } from "three";
import { computed, ref } from "vue";

const ZERO = new Vector3();
export const useGameStore = defineStore('gameStore', () => {
    const spaceData = ref(tmpData);
    const gameReady = ref(false);

    let positionData = computed(() => {
        return new Array<Vector3>(spaceData.value.length);
    });

    const setPositionAt = (index:number, position:Vector3) => {
        positionData.value[index] = position;
        if (index === spaceData.value.length - 1) {
            gameReady.value = true;
        }
    }

    const getPositionAt = (index:number) => {
        if (index >= positionData.value.length) return ZERO;
        return positionData.value[index];
    }

    const reset = () => {
        spaceData.value = [];
        gameReady.value = false;
    }

    return { spaceData, positionData, setPositionAt, getPositionAt, gameReady, reset };
});