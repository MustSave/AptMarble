<template>
    <div class="board">
      <!-- Top row -->
      <div
        v-for="(cell, index) in cells"
        :key="index"
        :class="cell === 'corner' ? 'corner' : 'space'"
        ref="cellRefs"
      ></div>
      <!-- Canvas for Three.js scene -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { nextTick, watch } from 'vue';
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { useThreeStore } from '@/stores/threeStore';
  
  const cells = [
    'corner', 'space', 'space', 'space', 'space', 'space', 'space', 'space', 'space', 'space', 'corner', // Top row
  ];
  const cellRefs = ref<HTMLElement[]>([]);
  const threeStore = useThreeStore();
  
  const initThreeJS = () => {
    threeStore.initThreeJs(undefined, 5);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    cellRefs.value.forEach((cellRef, index) => {
        const boxMesh = new THREE.Mesh(geometry, material);
        
        const pos = threeStore.getPositionCenterOfElem(cellRef);
        boxMesh.position.set(pos.x, pos.y, pos.z);
        boxMesh.scale.setScalar(0.001);
        threeStore.addToScene(boxMesh);
    });

    threeStore.useOribitController();
  };
  
  onMounted(() => {
    nextTick(() => {
        initThreeJS();
    })
  });
  </script>
  
  <style scoped>
  .board {
    display: grid;
    grid-template-columns: 125px repeat(9, 80px) 125px; /* Width of 80px for normal spaces and 125px for corners */
    grid-auto-rows: 125px; /* Height of 125px for normal spaces */
    grid-gap: 2px; /* Gap between cells */
    width: 100%; /* Adjust as needed */
    border: 2px solid black; /* Border for visualization */
    background-color: black;
  }
  .space {
    background-color: #ccc; /* Color of normal spaces */
  }
  .corner {
    background-color: #aaa; /* Color of corner spaces */
  }
  </style>
  