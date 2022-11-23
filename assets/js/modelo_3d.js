/*==================== IMPORTS ====================*/ 
import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

/*==================== CREATE SCENE ====================*/ 
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

/*==================== LOAD THE FILE GLTF/GLB ====================*/ 
const loader = new GLTFLoader();
loader.load('../../assets/3D/perfil.glb', function (gltf) {
    const root = gltf.scene;
    root.scale.set(20, 20, 20);
    root.position.set(0, -0.15, 0);
    scene.add(root);
}, function (xhr) {
    console.log((xhr.loader / xhr.total * 100) + "% loaded");
}, function (error) {
    console.log('An error occurred');
});

/*==================== LIGHTS FOR THE FILE ====================*/ 
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

/*==================== SIZES CONFIGURATION ====================*/ 
const width = canvas.clientWidth;
const height = canvas.clientHeight;

const sizes = {
    width: width,
    height: height
};

/*==================== CAMERA CONFIGURATION ====================*/ 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0.04, 3);
scene.add(camera);

/*==================== CONTROLS CONFIGURATION ====================*/ 
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 8;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE
};
controls.touches = {
	ONE: THREE.TOUCH.ROTATE
};

/*==================== RENDERER CONFIGURATION ====================*/ 
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true // Delete background
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding; // Set color encoding

/*==================== PRINCIPAL FUNCTION ====================*/ 
function animate() {
    requestAnimationFrame(animate);
    // root.rotation.y += 0.013;
    renderer.render(scene, camera);
    controls.update();
    controls.enableDamping = true;
};
animate();
