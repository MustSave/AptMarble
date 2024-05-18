import { getPositionCenterOfElem as getCenterPos, loadGltf, loadFbx } from '@/scripts/threeUtil';
import { defineStore } from 'pinia'
import { AnimationMixer, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer, type Renderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { ref, defineEmits, watch } from 'vue';

const OriginVector = new Vector3(0, 0, 0);

export const useThreeStore = defineStore('three', () => {
  const checkThreeReady = ref(false);
  const threeReadyListener:Array<Function> = [];
  watch(checkThreeReady, (nv, ov) => {
    for (let cb of threeReadyListener) {
      cb.call(null, nv, ov);
    }
  });

  const listenThreeReadyEvent = (cb:Function) => {
    threeReadyListener.push(cb);
  } 

  const three = {
    scene: null as unknown as  Scene,
    camera: null as unknown as PerspectiveCamera,
    renderer: null as unknown as Renderer,
    mixer: null as unknown as AnimationMixer,
  }

  const initThreeJs = (canvas?:HTMLCanvasElement, cameraPositionZ=5) => {
    let width: number, height: number;

    if (canvas) {
      const canvasBounds = canvas?.getBoundingClientRect();
      width = canvasBounds.width;
      height = canvasBounds.height * 1.2;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    three.camera = new PerspectiveCamera(75, width / height, 1, 1000);
    three.camera.position.setZ(cameraPositionZ);
    // three.camera.position.set(0, 10, cameraPositionZ);
    // const lookAtVector = new Vector3(0, 0, 0); // 시점을 중앙으로 설정
    // three.camera.lookAt(lookAtVector);

    three.scene = new Scene();

    three.renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas });
    three.renderer.setSize(width, height);

    three.mixer = new AnimationMixer(three.scene);
    render();

    if (!canvas) document.body.appendChild(three.renderer.domElement);

    window.addEventListener('resize', () => {
      const canvasBounds = three.renderer.domElement.getBoundingClientRect();
      three.camera.aspect = canvasBounds.width / canvasBounds.height;
      three.camera.updateProjectionMatrix();
      three.renderer.setSize(canvasBounds?.width || window.innerWidth, canvasBounds?.height || window.innerHeight);
    });

    animate();
    // threeReadyListener.splice(0, threeReadyListener.length);
    checkThreeReady.value = true;
  }

  const getPositionCenterOfElem = (elem:HTMLElement) => {
    return getCenterPos(elem, three.renderer, three.camera);
  }

  const addToScene = (obj:Object3D) => {
    three.scene.add(obj);
  }

  const render = () => {
    three.renderer.render(three.scene, three.camera);
  }

  const animate = () => {
    const doAnimate = () => {
      requestAnimationFrame(doAnimate);
      render();
    };
    doAnimate();
  }

  const createMixer = (rootObj:Object3D) => {
    return new AnimationMixer(rootObj);
  }

  const useOribitController = () => {
    new OrbitControls(three.camera, three.renderer.domElement);
  }

  const loadGltfToScene = (url:string, position:Vector3=OriginVector, scale=1) => {
    return loadGltf(url).then(gltf => {
      gltf.scene.scale.setScalar(scale);
      gltf.scene.position.set(position.x, position.y, position.z);
      addToScene(gltf.scene);
      return gltf;
    });
  }

  const loadFbxToScene = (url:string, position:Vector3=OriginVector, scale=1) => {
    return loadFbx(url).then(fbx => {
      fbx.scale.setScalar(scale);
      fbx.position.set(position.x, position.y, position.z);
      addToScene(fbx);
      return fbx;
    });
  }

  return { three, createMixer, listenThreeReadyEvent, checkThreeReady, initThreeJs, loadFbx: loadFbxToScene, animate, getPositionCenterOfElem, addToScene, render, useOribitController, loadGltf: loadGltfToScene };
})
