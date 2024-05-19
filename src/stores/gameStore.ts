import type { Player } from "@/scripts/player";
import { tmpData } from "@/scripts/spaceData";
import { defineStore } from "pinia";
import { Vector3 } from "three";
import { computed, ref } from "vue";

const ZERO = new Vector3();
export const useGameStore = defineStore('gameStore', () => {
    const spaceData = ref(tmpData);
    const gameReady = ref(false);
    const diceResult = ref<number[]>([1, 1]);
    let players:Player[] = [];

    let positionData = computed(() => {
        return new Array<Vector3>(spaceData.value.length);
    });

    const setDiceResult = (...nums:number[]) => {
        diceResult.value = nums;
    }

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
        players = [];
    }

    const addPlayer = (player:Player) => {
        players.push(player);
    }

    const findOwner = (spaceIndex:number) => {
        for (let player of players) {
            if (player.checkOwnBuilding(spaceIndex)) {
                return player;
            }
        }
        return undefined;
    }

    setTimeout(() => {
        setDiceResult(4, 6);
    }, 1000);

    return { spaceData, positionData, diceResult, setDiceResult, findOwner, addPlayer, setPositionAt, getPositionAt, gameReady, reset };
});