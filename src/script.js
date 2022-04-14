import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DoubleSide } from 'three'


/**
 *Loaders 
 */
 const dracoloader = new DRACOLoader()
 dracoloader.setDecoderPath('/draco/')
 
const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoloader)








/**
 * Base
 */
// Debug
const gui = new dat.GUI()
// const debugObject = {}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Update all materials
 */
const updateAllMaterial  = () =>
{
    scene.traverse((child) => 
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            
            child.material.needsUpdate = true
            child.castShadow = true
            // child.receiveShadow = true
            
        }
    })
}


/**
 * Models
 */
let object = []
gltfloader.load(
    'models/test2.glb',
    (gltf) => 
    {
        
        gltf.scene.scale.set(5,5,5)
        gltf.scene.position.set(0,-4,0)
        gltf.scene.rotation.y = Math.PI * 0.5
        console.log(gltf.scene);
        scene.add(gltf.scene)


        gui.add(gltf.scene.rotation,'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation')

        for(const obj of gltf.scene.children)
        {
            if(obj.name === "monitor")
            {
                object = obj.children
            }
        }
        updateAllMaterial()
    }
)


/**
 * Floor
 */
 const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(80, 80),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        side : DoubleSide
    })
)
floor.receiveShadow = true
floor.position.y = -4.2
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster()
/**
 * Mouse
 */
const mouse = new THREE.Vector2()

 window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX/ sizes.width) * 2 -1
    mouse.y = -((event.clientY/ sizes.height) * 2 -1)

    if(currentIntersect) {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
})



/**
 * Light
 */
const DirectionLight = new THREE.DirectionalLight('#ffff',3)
DirectionLight.position.set(4,19,-15.2)
DirectionLight.castShadow = true
DirectionLight.shadow.camera.far = 100
DirectionLight.shadow.mapSize.set(1024,1024)
DirectionLight.shadow.normalBias = 0.05
DirectionLight.rotation.y = 43
scene.add(DirectionLight)


gui.add(DirectionLight,'intensity').min(0).max(10).step(0.001).name('LightIntensity')
gui.add(DirectionLight.position,'x').min(-50).max(50).step(0.1).name('Lightx')
gui.add(DirectionLight.position,'y').min(-50).max(50).step(0.1).name('Lighty')
gui.add(DirectionLight.position,'z').min(-50).max(50).step(0.1).name('Lightz')





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(19, 17, -12)
scene.add(camera)

//for camera movement
gui.add(camera.position,'x').min(-50).max(50).step(1).name('cameraX')
gui.add(camera.position,'y').min(-50).max(50).step(1).name('cameraY')
gui.add(camera.position,'z').min(-50).max(50).step(1).name('cameraZ')

//for camera rotation
// gui.add(camera.rotation,'x').min(-50).max(50).step(1).name('cameraRotationX')
// gui.add(camera.rotation,'y').min(-50).max(50).step(1).name('cameraRotationY')
// gui.add(camera.rotation,'z').min(-50).max(50).step(1).name('cameraRotationZ')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minPolarAngle = 1
controls.maxPolarAngle = 1 * (Math.PI / 180)

window.addEventListener('click', (event) => {
    console.log(currentIntersect);
    if(currentIntersect)
    {
        window.open("https://www.google.com")
    }
})


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true  //to get same light between blender and threejs
renderer.outputEncoding = THREE.sRGBEncoding

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


/**
 * Animate
 */

let currentIntersect = null

const tick = () =>
{
    // Update controls
    controls.update()

    //set Raycaster
    raycaster.setFromCamera(mouse,camera)
    const intersect = raycaster.intersectObjects(object)

    if(intersect.length)
    {
        currentIntersect = intersect
    }
    else
    {
        currentIntersect = null
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()