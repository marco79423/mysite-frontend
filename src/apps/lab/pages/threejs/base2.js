import React from 'react'
import * as THREE from 'three'
import Head from 'next/head'
import {Canvas, useFrame} from '@react-three/fiber'

export default function Base2() {

  React.useEffect(() => {
    const container = document.getElementById('container')

    // 建立繪製器 (Renderer)
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // 建立相機 (Camera)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
  }, [])

  return (
    <>
      <Head>
        <title>Base (@react-three/fiber) | Three.js | 兩大類的實驗室</title>
      </Head>

      <Canvas>
        <perspectiveCamera
          args={[75, window.innerWidth / window.innerHeight, 0.1, 1000]}
          position={[0, 0, 5]}
        />

        <Cube/>
      </Canvas>
    </>
  )
}

function Cube() {
  const ref = React.useRef()

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial color="green"/>
    </mesh>
  )
}
