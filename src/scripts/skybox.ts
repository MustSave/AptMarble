import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const useSkybox = (path:string='src/assets/cubemap') => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.zIndex = '1';
    document.body.appendChild(renderer.domElement);
    
    // Cube texture loader를 사용하여 skybox 생성
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        `${path}/px.png`, // right
        `${path}/nx.png`, // left
        `${path}/py.png`, // top
        `${path}/ny.png`, // bottom
        `${path}/pz.png`, // back
        `${path}/nz.png`  // front
    ]);
    scene.background = texture;
    
    // camera 위치 설정
    camera.position.z = 30;
    new OrbitControls(camera, renderer.domElement);

    // 랜덤하게 변경될 회전 방향 설정
    let rotationSpeedX = Math.random() * 0.0008; // -0.01에서 0.01 사이의 값
    let rotationSpeedY = 0.0002; // -0.01에서 0.01 사이의 값

    // 일정 시간마다 회전 방향 변경
    // setInterval(() => {
    //     rotationSpeedX = Math.random() * 0.0008;
    //     rotationSpeedY = Math.random() * 0.0008;
    // }, 5000); // 5초마다 변경

    // 렌더링 루프
    function animate() {
        requestAnimationFrame(animate);

        // 각도 조정하여 회전
        // camera.rotation.x += rotationSpeedX;
        camera.rotation.y += rotationSpeedY;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}