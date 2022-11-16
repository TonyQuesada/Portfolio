

import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
var root;

const loader = new GLTFLoader();
loader.load('../../assets/3D/perfil.glb', function (gltf) {
    root = gltf.scene;
    root.scale.set(20, 20, 20);
    root.position.set(0, -0.15, 0);
    scene.add(root);
    
}, function (xhr) {
    console.log((xhr.loader / xhr.total * 100) + "% loaded");
}, function (error) {
    console.log('An error occurred');
});


const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

//Boiler Plate Code
// const canvas = renderer.domElement;
const width = canvas.clientWidth;
const height = canvas.clientHeight;


const sizes = {
    width: width,
    height: height
    // width: window.innerWidth,
    // height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0.04, 3);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding

function animate() {
    requestAnimationFrame(animate);

    root.rotation.y += 0.013;
    renderer.render(scene, camera);
    controls.update();
    controls.enableDamping = true;
};

animate();
