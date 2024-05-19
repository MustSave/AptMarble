import { moveTo } from '@/scripts/threeUtil';
import { useGameStore } from '@/stores/gameStore';
import { useThreeStore } from '@/stores/threeStore';
import { AnimationMixer, type Object3D } from 'three';
import { computed, ref, watch, type Ref } from 'vue';

export class Player {
    private gameStore;
    private threeStore;
    private obj:                Object3D = undefined as unknown as Object3D;
    private currentSpaceIndex:  Ref<number>;
    private money:              Ref<number>;
    private name:               string;
    private ownBuildings:       Ref<Set<number>>;

    constructor(name:string, spaceIndex:Ref<number>, money:Ref<number>) {
        this.threeStore = useThreeStore();
        this.gameStore = useGameStore();
        this.currentSpaceIndex = spaceIndex;
        this.money = money;
        this.name = name;
        this.ownBuildings = ref(new Set<number>());
    }

    init = () => {
        const gameReady = computed(() => useGameStore().gameReady);
        return new Promise<Player>((resolve, reject) => {
            const onGameReady = async () => {
                const fbx = await this.threeStore.loadFbx(
                    '/player.fbx',
                    this.gameStore.getPositionAt(this.currentSpaceIndex.value),
                    0.01
                ).catch((e) => reject(e));
                
                if (!fbx) return;

                this.obj = fbx;
                const mixer = this.threeStore.createMixer(this.obj);
                const action = mixer.clipAction(fbx.animations[0]);
                action.play();
                action.timeScale = 0.3;
            
                this.requestAnimate(fbx, mixer);

                watch(this.currentSpaceIndex, (nv, ov) => {
                    this.moveToSpace(ov, nv);
                });

                this.gameStore.addPlayer(this);
                resolve(this);
            }
            watch(gameReady, onGameReady);
        });
    }

    private requestAnimate = (obj:Object3D, mixer?:AnimationMixer) => {
        const animate = () => {
            requestAnimationFrame(animate);
            obj.lookAt(this.threeStore.three.camera.position);
            if (mixer) {
                mixer.update(0.01); // 0.01은 프레임 간의 시간 간격입니다. 필요에 따라 조절할 수 있습니다.
            }
        }
        animate();
    }

    private moveToSpace = async (from:number, to:number, t=300) => {
        if (!this.obj) return;
        while (from !== to) {
            const nextSpaceIndex = (from+1) % this.gameStore.spaceData.length;
            await moveTo(this.obj, this.gameStore.getPositionAt(nextSpaceIndex), t);
            from = nextSpaceIndex;
        }
    }

    jumpToSpace = async(spaceIndex:number, t=1500) => {
        if (!this.obj) return;
        await moveTo(this.obj, this.gameStore.getPositionAt(spaceIndex), t);
    }

    buy = (spaceIndex:number) => {
        const spaceData = this.gameStore.spaceData[spaceIndex];
        const price = Number(spaceData.price) || 100;

        if (this.money.value >= price) {
            this.money.value -= price;
            this.ownBuildings.value.add(spaceIndex);
            console.log(`구매 완료\n현재 잔액: ${this.money.value}`);
        } else {
            alert('잔액 부족');
        }
    }

    checkOwnBuilding = (spaceIndex:number) => {
        return this.ownBuildings.value.has(spaceIndex);
    }

    getName = () => this.name;
}