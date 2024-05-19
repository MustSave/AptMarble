<script setup lang="ts">
import { GameClient } from '@/scripts/stomp';
import { loadCubeTexture } from '@/scripts/threeUtil';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const path: string = '/cubemap/christmas';
const useSkyBox = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.zIndex = '1';
    document.body.appendChild(renderer.domElement);

    // Cube texture loader를 사용하여 skybox 생성
    const texture = loadCubeTexture(path);
    scene.background = texture;

    // camera 위치 설정
    camera.position.z = 30;
    new OrbitControls(camera, renderer.domElement);

    //회전 설정
    let rotationSpeedY = 0.0002; // -0.01에서 0.01 사이의 값

    // setInterval(() => {
    //     rotationSpeedY = Math.random() * 0.0008;
    // }, 5000);

    // 렌더링 루프
    const animate = () => {
        requestAnimationFrame(animate);
        camera.rotation.y += rotationSpeedY;
        renderer.render(scene, camera);
        console.log(camera.position);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

useSkyBox();
const stomp = new GameClient();
</script>

<template>
    <RouterView :game-client="stomp" />
    <!-- <DebugSocketComponent :message="message" :connected="connected" /> -->
</template>

<style scoped></style>

<style>
.instruction {
    overflow: hidden;
}
</style>