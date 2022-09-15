import './style.css';
import * as THREE from 'three';
import  { OBJLoader }  from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import myEpikNft from './utils/MyEpikNFT.json'
const CONTRACT_ADDRESS = "0x71964621a255F1da7ebde644F36258Cf365174dF";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  preserveDrawingBuffer: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-1);
camera.position.setY(0)
camera.position.setX(4)


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

// adding Head Sphere 
const head = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x8dd3dd }))
scene.add(head)
//Loading OBJ and accompanying MTL

let eyeArray = [
  {name: 'eyes1', type: 'eye'}, 
  {name: 'eyes2', type: 'eye'}, 
  {name: 'eyes3', type: 'eye'}, 
]

let noseArray = [
  {name: 'nose1', type: 'nose'}, 
  {name: 'nose2', type: 'nose'}, 
  {name: 'nose3', type: 'nose'}, 
]

let mouthArray = [
  {name: 'mouth1', type: 'mouth'}, 
  {name: 'mouth2', type: 'mouth'}, 
  {name: 'mouth3', type: 'mouth'}, 
]

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
const collExporter = new ColladaExporter();
let i = 0
// IN the Future loop one of these functions so that it goes through an array of each MTL file and OBJ and adds to the scene
async function loadRndFace( asset ) {
    let mtl = await mtlLoader.loadAsync(`./faceMtls/${asset.name}.mtl`);
    mtl.preload();
    objLoader.setMaterials(mtl);
    let obj = await objLoader.loadAsync(`./faceObjs/${asset.name}.obj`);
    scene.add(obj);
    switch (asset.type) {
      case 'eye':
        obj.position.y = 0.5
        obj.position.x = 1.2
        break;
      case 'nose':
        obj.position.x = 1.23
        break;
      default:
        obj.position.y = -0.5
        obj.position.x = 1.18
        break;
    }
}  

// async function downloadFile(data) {

// }

(async () => {
    let rndInt = Math.floor(Math.random() * 3) 
    await loadRndFace(eyeArray[rndInt])
     rndInt = Math.floor(Math.random() * 3) 
    await loadRndFace(noseArray[rndInt])
     rndInt = Math.floor(Math.random() * 3) 
    await loadRndFace(mouthArray[rndInt])
})()

const link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link );

const exporter = new ColladaExporter();

function exportCollada() {

  const result = exporter.parse( scene, undefined, { upAxis: 'Y_UP', unitName: 'millimeter', unitMeter: 0.001 } );
  let materialType = 'Phong';

  // if ( shading === 'wireframe' ) {

  //   materialType = 'Constant';

  // }

  // if ( shading === 'smooth' ) {

  //   materialType = 'Lambert';

  // }

  saveString( result.data, 'face' + '.dae' );

  result.textures.forEach( tex => {

    saveArrayBuffer( tex.data, `${ tex.name }.${ tex.ext }` );

  } );

}

function save( blob, filename ) {

  link.href = URL.createObjectURL( blob );
  link.download = filename;
  link.click();

}

function saveString( text, filename ) {

  save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}

function saveArrayBuffer( buffer, filename ) {

  save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

}


// Torus

const geometry = new THREE.TorusGeometry(3, 0.4, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0xff6347 }));
const torus2 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0xff00ff }));
const torus3 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.4, 16, 100), new THREE.MeshStandardMaterial({ color: 0x006699 }));

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

// //Torus add to scene

// function addTorus() {
//   const rndInt = Math.floor(Math.random() * 3) + 1
//   switch (rndInt) {
//     case 1:
//       scene.add(torus)
//       torus.rotation.set(2,0,0)
//       torus.position.z = -5

//       break;
//     case 2: 
//       scene.add(torus2)
//       torus2.rotation.set(2,0,0)
//       torus2.position.z = -10

//       break;
//     default:
//       scene.add(torus3)
//       torus3.rotation.set(2,0,0)
//       torus3.position.z = -15

//       break;
//   }
// }

// //Cube add to scene
// function addCube() {
//   const rndInt = Math.floor(Math.random() * 3) + 1
//   switch (rndInt) {
//     case 1:
//       scene.add(cube)
//       cube.position.x = -5

//       break;
//     case 2: 
//       scene.add(cube2)
//       cube2.position.x = -10

//       break;
//     default:
//       scene.add(cube3)
//       cube3.position.x = -15

//       break;
//   }
// }

// //Moon add to scene
// function addMoon() {
//   const rndInt = Math.floor(Math.random() * 3) + 1
//   switch (rndInt) {
//     case 1:
//       scene.add(moon)
//       moon.position.x = 5

//       break;
//     case 2: 
//       scene.add(moon2)
//       moon2.position.x = 10

//       break;
//     default:
//       scene.add(moon3)
//       moon3.position.x = 15

//       break;
//   }
// }

// addTorus()
// addCube()
// addMoon()







// let strDownloadMime = "image/octet-stream";

// // save file button

// let saveFile = async (strData, filename)  => {
//   let link = document.createElement('a');
//   if (typeof link.download === 'string') {
//       document.body.appendChild(link); //Firefox requires the link to be in the body
//       link.download = filename;
//       link.href = strData;
//       link.click();
//       //await askContractToMintNft(strData)

//       document.body.removeChild(link); //remove the link when done

//   } else {
//       location.replace(uri);
//   }
// }

// function saveAsImage() {
//   let imgData, imgNode;

//   try {
//       var strMime = "image/jpeg";
//       imgData = renderer.domElement.toDataURL(strMime);
//       // contextt = renderer.domElement.getContext("2d");
//       // let something = contextt.getSVG();
//     //   function drawCanvas(ctx) {
//     //     ctx.fillStyle = "#FF0000";
//     //     ctx.fillRect(0,0,150,75);
//     // }
//     // drawCanvas(canvasContext); 
      
//       saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

//   } catch (e) {
//       console.log(e);
//       return;
//   }
// }

document.getElementById("saveLink").addEventListener('click', exportCollada);


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
