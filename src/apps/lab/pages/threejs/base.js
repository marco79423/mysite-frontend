import React from 'react'
import * as THREE from 'three'
import Head from 'next/head'

export default function Base() {

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
    camera.position.set(0, 0, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // 建立模型、材質並放置到場景
    const cubeGeometry = new THREE.BoxGeometry()
    const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cube)

    // 繪製循環
    const animate = function () {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <>
      <Head>
        <title>Base | Three.js | 兩大類的實驗室</title>
      </Head>

      <div id="container"/>
    </>
  )
}
