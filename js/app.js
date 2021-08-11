import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// Export so that created effects can be used in any other environment/framework
export default class Sketch {
  constructor(options) {
    // this.time = 0
    const { fov, container, near, far, cameraStart } = options

    /** TODO: store reference to html container element,
     * container will never be undefined
     */
    this.container = container
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth

    // TODO: create Three.js camera object
    this.camera = new THREE.PerspectiveCamera(
      fov || 30,
      this.width / this.height,
      1,
      near || far || 10000
    )
    this.camera.position.z = cameraStart || 100

    // TODO: create Three.js scene object
    this.scene = new THREE.Scene()

    // TODO: create Three.js renderer object
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
    this.container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // initialize
    this.resize()
    this.setupResize()
    this.addObjects()
    this.render()
  }

  setupResize = () => {
    window.addEventListener('resize', this.resize)
  }

  // Function to facilitate responsiveness
  resize = () => {
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  addObjects = () => {
    this.geometry = new THREE.IcosahedronGeometry(20, 4)
    this.material = new THREE.MeshBasicMaterial({
      color: 0xb7ff00,
      wireframe: true,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  // animation loop
  render = () => {
    // this.time += 0.05
    // console.log(this.time)
    // this.mesh.rotation.x = this.time / 2000
    // this.mesh.rotation.y = this.time / 1000
    // this.material.uniforms.time.value = this.time
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render)
  }
}

new Sketch({
  container: document.getElementById('container'),
})
