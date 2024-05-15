import { moveTo } from '@/scripts/threeUtil';
import { useGameStore } from '@/stores/gameStore';
import { useThreeStore } from '@/stores/threeStore';
import type { Object3D } from 'three';
import { computed, watch } from 'vue';

export class Player {
    gameStore;
    threeStore;
    obj:Object3D = null as unknown as Object3D;
    currentSpaceIndex:number;
    money:number;

    constructor() {
        this.threeStore = useThreeStore();
        this.gameStore = useGameStore();
        this.currentSpaceIndex = 0;
        this.money = 10000000;
        console.log(this.gameStore.positionData)
    }

    init = () => {
        const gameReady = computed(() => useGameStore().gameReady);
        return new Promise<Player>((resolve, reject) => {
            watch(gameReady, async () => {
                const fbx = await this.threeStore.loadFbx('src/assets/Happy Idle.fbx', this.gameStore.getPositionAt(this.currentSpaceIndex), 0.015)
                    .catch(() => null);
                if (!fbx) {
                    reject(this);
                    return;
                }
    
                this.obj = fbx;
                const action = this.threeStore.three.mixer.clipAction(fbx.animations[0]);
                action.timeScale = 0.3;
                action.play();
            
                const animate = () => {
                    requestAnimationFrame(animate);
                    fbx.lookAt(this.threeStore.three.camera.position);
                    if (this.threeStore.three.mixer) {
                        this.threeStore.three.mixer.update(0.01); // 0.01은 프레임 간의 시간 간격입니다. 필요에 따라 조절할 수 있습니다.
                    }
                }
                animate();
                resolve(this);
            });
        })
    }

    moveToSpace = async (spaceIndex:number, t=300) => {
        if (!this.obj) return;
        while (this.currentSpaceIndex !== spaceIndex) {
        const nextSpaceIndex = (this.currentSpaceIndex+1) % this.gameStore.spaceData.length;
            await moveTo(this.obj, this.gameStore.getPositionAt(nextSpaceIndex), t);
            this.currentSpaceIndex = nextSpaceIndex;
        }
    }

    jumpToSpace = async(spaceIndex:number, t=1500) => {
        if (!this.obj) return;
        await moveTo(this.obj, this.gameStore.getPositionAt(spaceIndex), t);
    }

    buy = (spaceIndex:number) => {
        const spaceData = this.gameStore.spaceData[spaceIndex];
        const price = Number(spaceData.price) || 100;

        if (this.money >= price) {
            this.money -= price;
            alert(`구매 완료\n현재 잔액: ${this.money}`);
        } else {
            alert('잔액 부족');
        }
    }
}