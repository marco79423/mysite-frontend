import React from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Head from 'next/head'

export default function OrbitControlsPage() {

  React.useEffect(() => {
    const container = document.getElementById('container')

    // 設定 Renderer
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // 建立場景
    const scene = new THREE.Scene()

    // 建立相機
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(2, 2, 2)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // 設定立方體 (方便觀察)
    const cubeGeometry = new THREE.BoxGeometry()
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({color: 'green'}),
      new THREE.MeshBasicMaterial({color: 'blue'}),
      new THREE.MeshBasicMaterial({color: 'red'}),
      new THREE.MeshBasicMaterial({color: 'green'}),
      new THREE.MeshBasicMaterial({color: 'blue'}),
      new THREE.MeshBasicMaterial({color: 'red'}),
    ]
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials)
    scene.add(cube)

    // 設定 OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 1

    const animate = function () {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <>
      <Head>
        <title>OrbitControls 實驗 | Three.js | 兩大類的實驗室</title>
      </Head>

      <div id="container"/>
    </>
  )
}
