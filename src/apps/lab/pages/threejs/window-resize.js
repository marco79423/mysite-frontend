import React from 'react'
import * as THREE from 'three'
import Head from 'next/head'

export default function WindowResizePage() {

  React.useEffect(() => {
    const container = document.getElementById('container')

    // 設定 Renderer
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // 調整視窗會影響 Renderer 繪製的範圍 (如平面超出畫面)
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    // 建立場景
    const scene = new THREE.Scene()

    // 建立相機
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // 調整投影視窗的比例 (如變影)
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }, false)

    const planeGeometry = new THREE.PlaneGeometry()
    const planeMaterial = new THREE.MeshBasicMaterial({color: 'green'})
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(plane)

    const animate = function () {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <>
      <Head>
        <title>Window Resize 實驗 | Three.js | 兩大類的實驗室</title>
      </Head>

      <div id="container"/>
    </>
  )
}
