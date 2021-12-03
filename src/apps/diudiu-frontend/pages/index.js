import React from 'react'
import Head from 'next/head'
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber'
import {CssBaseline} from '@material-ui/core'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import useWindowSize from '../components/hooks/useWindowSize'

extend({OrbitControls})

export default function Index() {
  const {width, height} = useWindowSize()

  return (<>
    <Head>
      <title>丟丟</title>
      <meta name="description" content="丟丟"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <CssBaseline/>

    <DiceBox width={width} height={height}/>
  </>)
}

function CameraControls() {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {camera, gl: {domElement}} = useThree()

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = React.useRef()
  useFrame((state) => controls.current.update())
  return <orbitControls ref={controls} args={[camera, domElement]}/>
}

function DiceBox({width, height}) {
  return (
    <Canvas style={{height, width}} shadows>
      <CameraControls/>
      <axesHelper/>
      <ambientLight color={0xf0f5fb}/>
      <spotLight
        color={0xefdfd5}
        intensity={20}
        position={[-2, 2, 2]}
        distance={5}
        castShadow={true}
      />

      <Desk/>
      <Dice/>
    </Canvas>
  )
}

function Desk(props) {
  const ref = React.useRef()

  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow={true}
    >
      <planeGeometry args={[5, 5]}/>
      <meshPhongMaterial color={0xdfdfdf}/>
    </mesh>
  )
}

function Dice(props) {
  const ref = React.useRef()

  return (
    <mesh ref={ref} castShadow={true} position={[0, 0, 0.5]}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={'#202020'}/>
    </mesh>
  )
}
