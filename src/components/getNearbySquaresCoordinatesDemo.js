import React, { Component } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import {
  PerspectiveCamera,
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer
} from 'three'
import listen from 'key-state'
import getNearbySquaresCoordinates from '../lib/getNearbySquaresCoordinates'

/**
 * Generate planes mesh from given squares and add them to the scene.
 *
 * @param {*} scene
 * @param {*} planes
 */
const addPlanesToScene = (scene, planes) => {
  var geometry, material, mesh
  const meshList = []

  for (const plane of planes) {
    geometry = new PlaneGeometry(plane.width, plane.width, 0, 0)
    material = new MeshBasicMaterial()
    if (plane.width < 3) {
      material.color.setHex(0xff0000)
    } else if (plane.width < 9) {
      material.color.setHex(0x00ff00)
    } else if (plane.width < 28) {
      material.color.setHex(0x0000ff)
    } else if (plane.width < 92) {
      material.color.setHex(0xcccccc)
    } else {
      material.color.setHex(0xffffff)
    }
    mesh = new Mesh(geometry, material)
    mesh.position.set(plane.position.x, plane.position.y, plane.width * -0.001)
    scene.add(mesh)
    meshList.push(mesh)
  }
  return meshList
}

const initReference = scene => {
  var geometry, material, reference

  geometry = new PlaneGeometry(0.1, 0.1, 0, 0) // new BoxGeometry(0.2, 0.2, 0.2)
  material = new MeshBasicMaterial()
  material.color.setHex(0x0000ff)
  reference = new Mesh(geometry, material)
  reference.position.set(0, 0, 1)
  scene.add(reference)
  return reference
}

class Scene2d extends Component {
  constructor (props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount () {
    var camera, scene, renderer
    var reference
    var areas
    init(this.myRef, this.props.width, this.props.height)
    const keys = listen(window)
    animate()

    function init (container, width, height) {
      camera = new PerspectiveCamera(70, width / height, 0.01, 30)
      camera.position.z = 20

      scene = new Scene()

      areas = addPlanesToScene(
        scene,
        getNearbySquaresCoordinates({ x: 0, y: 0 }, 2)
      )

      reference = initReference(scene)

      renderer = new WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      document
        .getElementById('getNearbySquaresCoordinates')
        .appendChild(renderer.domElement)
    }

    function animate () {
      requestAnimationFrame(animate)

      if (keys.KeyA) {
        reference.position.x -= 0.1
      }
      if (keys.KeyD) {
        reference.position.x += 0.1
      }
      if (keys.KeyS) {
        reference.position.y -= 0.1
      }
      if (keys.KeyW) {
        reference.position.y += 0.1
      }

      var updates = getNearbySquaresCoordinates(reference.position, 2)
      if (areas) {
        for (let area of areas) {
          scene.remove(area)
          area.geometry.dispose()
          area.material.dispose()
          area = undefined
        }
      }
      areas = addPlanesToScene(scene, updates)

      renderer.render(scene, camera)
    }
  }
  render () {
    return (
      <div ref={this.myRef} className="tc" id="getNearbySquaresCoordinates" />
    )
  }
}

export default () => (
  <div className="flex flex-column h-100">
    <div className="fg1">
      <ContainerDimensions>
        <Scene2d />
      </ContainerDimensions>
    </div>
    <div className="fg0 pa4">
      <p className="avenir">Instructions: Use a/w/s/d to move the reference.</p>
      <p className="avenir">
        Note: This algorithm is only made for the purpose of fetching data. This
        is why empty areas are alowed, as they are considered already fetch at
        the appropriate resolution.
      </p>
    </div>
  </div>
)
