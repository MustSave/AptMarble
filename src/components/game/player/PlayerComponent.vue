<script setup lang="ts">
import { Player } from '@/scripts/player';
import { computed, ref, watch, onMounted } from 'vue';
import * as TWEEN from '@tweenjs/tween.js';

const props = defineProps({
  position: {
    type: String,
    required: true,
    default: 'top-left',
    validator(value) {
      return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value as string);
    }
  }
});

const spaceIndex = ref(0);
const money = ref(10000);
const displayedMoney = ref(money.value);
const name = "test";
const computedMoney = computed(() => displayedMoney.value.toLocaleString());
const isAnimating = ref(false);
const moneyText = ref<HTMLElement>(null as unknown as HTMLElement);
const moneyStyle = ref({
  transition: 'none',
  left: "0px",
  top: "0px",
  scale: '1',
  color: 'white',
});

const player = new Player(name, spaceIndex, money);
player.init().then(() => spaceIndex.value = 10)
setTimeout(() => player.buy(1), 5000);
const animateMoneyChange = (newMoney: number) => {
  isAnimating.value = true;

  const tween = new TWEEN.Tween({ value: displayedMoney.value })
    .to({ value: newMoney }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((object) => {
      displayedMoney.value = Math.round(object.value);
    })
    .onComplete(() => {
      isAnimating.value = false;
    })
    .start();

  function animate(time: number) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }

  requestAnimationFrame(animate);
};

watch(money, (newMoney) => {
  animateMoneyChange(newMoney);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const rect = moneyText.value.getBoundingClientRect();

  // Bring the element to the center of the window
  moneyStyle.value.transition = 'none'
  moneyStyle.value.left = (centerX - rect.left) + "px";
  moneyStyle.value.top = (centerY - rect.top) + "px";
  moneyStyle.value.color = 'black';
  moneyStyle.value.scale = '2';

  // After a delay, return the element to its original position
  setTimeout(() => {
    moneyStyle.value.transition = "all 1s";
    moneyStyle.value.left = "0px";
    moneyStyle.value.top = "0px";
    moneyStyle.value.color = 'white';
    moneyStyle.value.scale = '1';
  }, 1000);
});

onMounted(() => {
  animateMoneyChange(money.value);
});
</script>

<template>
  <div :class="[props.position, 'player-info', 'fixed']">
    <h2>{{ name }}</h2>
    <p>현재 위치: {{ spaceIndex }}</p>
    <p :style="moneyStyle" :class="{ animate: isAnimating, money: true }" ref="moneyText">보유 자금: {{ computedMoney }} ₩
    </p>
  </div>
</template>

<style scoped>
.player-info {
  padding: 10px;
  font-size: large;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  min-width: 300px;
  min-height: 100px;
  position: relative;
  pointer-events: none;
  z-index: 4;
}

.fixed {
  position: fixed;
}

.top-left {
  top: 80px;
  left: 10px;
}

.top-right {
  top: 80px;
  right: 10px;
}

.bottom-left {
  bottom: 10px;
  left: 10px;
}

.bottom-right {
  bottom: 10px;
  right: 10px;
}

.money {
  position: relative;
}
</style>
