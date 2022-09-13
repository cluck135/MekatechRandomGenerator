import './style.css';
import * as THREE from 'three';
import { ethers } from "ethers";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import myEpikNft from './utils/MyEpikNFT.json'
import { GridHelper } from 'three';
const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  preserveDrawingBuffer: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// fuckn around 

var a = new THREE.Vector3( 1, 0, 0 );
var b = new THREE.Vector3( 0, 1, 0 );

var c = new THREE.Vector3();
c.crossVectors( a, b );

scene.add(c)

// Torus

const geometry = new THREE.TorusGeometry(3, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0xff6347 }));
const torus2 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0xff00ff }));
const torus3 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0x006699 }));


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(lightHelper, gridHelper, axesHelper)

const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const jeffTexture = new THREE.TextureLoader().load('jeff.png');


// CUBE making
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ color: 0xff4447 }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ color: 0x00cc66 }));
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ color: 0x9966ff }));


// MOON making
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0x0099cc,
    normalMap: normalTexture,
  })
);

const moon3 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0x99ff99,
    normalMap: normalTexture,
  })
);

//ADDING to scene

function addTorus() {
  const rndInt = Math.floor(Math.random() * 3) + 1

  // add javascript switch case
}

scene.add(torus);
scene.add(torus2);
scene.add(torus3);



scene.add(cube);
scene.add(cube2);
scene.add(cube3);

scene.add(moon);
scene.add(moon2);
scene.add(moon3)

torus.rotation.set(2,0,0)
torus2.rotation.set(2,0,0)
torus3.rotation.set(2,0,0)

torus.position.z = -5
torus2.position.z = -10
torus3.position.z = -15

cube.position.x = -5
cube2.position.x = -10
cube3.position.x = -15

moon.position.x = 5
moon2.position.x = 10
moon3.position.x = 15





let strDownloadMime = "image/octet-stream";

// save file button

let saveFile = async (strData, filename)  => {
  let link = document.createElement('a');
  if (typeof link.download === 'string') {
      document.body.appendChild(link); //Firefox requires the link to be in the body
      link.download = filename;
      link.href = strData;
      link.click();
      //await askContractToMintNft(strData)

      document.body.removeChild(link); //remove the link when done

  } else {
      location.replace(uri);
  }
}

function saveAsImage() {
  let imgData, imgNode;

  try {
      var strMime = "image/jpeg";
      imgData = renderer.domElement.toDataURL(strMime);
      // contextt = renderer.domElement.getContext("2d");
      // let something = contextt.getSVG();
    //   function drawCanvas(ctx) {
    //     ctx.fillStyle = "#FF0000";
    //     ctx.fillRect(0,0,150,75);
    // }
    // drawCanvas(canvasContext); 
      
      saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

  } catch (e) {
      console.log(e);
      return;
  }
}

document.getElementById("saveLink").addEventListener('click', saveAsImage);


const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);

    // Setup listener! This is for the case where a user comes to our site
    // and connected their wallet for the first time.
  } catch (error) {
    console.log(error)
  }
}

//await connectWallet()

const askContractToMintNft = async (imageData) => {
  try {
    const { ethereum } = window;
    console.log(ethereum)
    if (ethereum) {
      const provider = await new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpikNft.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.makeAnEpikNFT();

      console.log("Mining...please wait.")
      await nftTxn.wait();
      console.log(nftTxn);
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}
// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(200).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;



// Scroll Animation

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   jeff.rotation.y += 0.01;
//   jeff.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// Animation Loop
//renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += -0.001
  // torus.rotation.y += -0.005

  //controls.update();
  renderer.render(scene, camera);
}



animate();
