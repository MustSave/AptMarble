import { Camera, Group, Object3D, Vector3, type Object3DEventMap, type Renderer } from "three";
import { FBXLoader, GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";
import * as TWEEN from '@tweenjs/tween.js';

export const getPositionCenterOfElem = (elem:HTMLElement, renderer:Renderer, camera:Camera) => {
    const rect = elem.getBoundingClientRect();
    const canvasBounds = renderer.domElement.getBoundingClientRect();

    const centerX = (rect.left + rect.width / 2 - canvasBounds.left);
    const centerY = (rect.top + rect.height / 2 - canvasBounds.top);

    const vec = new Vector3();
    const pos = new Vector3();
    vec.set(
        (centerX / canvasBounds.width) * 2 - 1,
        -(centerY / canvasBounds.height) * 2 + 1,
        0.5
    );
    vec.unproject( camera );
    vec.sub( camera.position ).normalize();
    const distance = -camera.position.z / vec.z;
    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    
    return pos;
}

export const loadGltf = (url:string) => {
    const loader = new GLTFLoader();
    const promise = new Promise<GLTF>((resolve, reject) => {
      loader.load(url, (gltf) => resolve(gltf), undefined, (error) => reject(error));
    });

    return promise;
  }

export const loadFbx = (url:string) => {
    const loader = new FBXLoader();
    const promise = new Promise<Group<Object3DEventMap>>((resolve, reject) => {
      loader.load(url, fbx => resolve(fbx), undefined, error => reject(error));
    });

    return promise;
}

export const moveTo = (obj:Object3D, pos:Vector3, t=1000) => {
  const tween = new TWEEN.Tween(obj.position)
  .to({ x: pos.x, y: pos.y, z: pos.z }, t) // 이동에 걸리는 시간 (밀리초)
  .easing(TWEEN.Easing.Quadratic.InOut); // 이징 옵션 설정
  
  tween.start();
  
  return new Promise((res, rej) => {
    const animate = () => {
      if (tween.isPlaying()) {
        requestAnimationFrame(animate);
      } else {
        res(tween);
      }
      TWEEN.update();
    }
    animate();
  });
}