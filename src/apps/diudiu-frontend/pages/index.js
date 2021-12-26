import React, {useRef} from 'react'
import Head from 'next/head'
import {Canvas} from '@react-three/fiber'
import {Physics, useBox, usePlane} from '@react-three/cannon'
import {CssBaseline} from '@material-ui/core'

import useWindowSize from '../components/hooks/useWindowSize'
import {OrbitControls, PerspectiveCamera, RoundedBox, useHelper} from '@react-three/drei'
import {CameraHelper} from 'three'

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

function DiceBox({width, height}) {
  return (
    <Canvas
      style={{height, width, background: 'lightblue'}}
      shadows
    >
      <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
        <OrbitControls/>
        <PerspectiveCamera makeDefault position={[0, 0, 10]}/>

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

        <BarrierTop/>
        <BarrierBottom/>
        <BarrierLeft/>
        <BarrierRight/>

        <Dice position={[3.5, 0, 5]} velocity={[-5, 0, 0]}/>
        <Dice position={[-3.5, 0, 5]} velocity={[15, 0, 0]}/>
        <Dice position={[0, -3.5, 5]} velocity={[0, 20, 0]}/>
      </Physics>
    </Canvas>
  )
}

function Desk(props) {
  const [ref] = usePlane(() => ({...props}))

  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow={true}
    >
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={0xdfdfdf}/>
    </mesh>
  )
}

function Dice({position, velocity, ...props}) {
  const [ref, api] = useBox(() => ({mass: 1, position: position, velocity: velocity}))

  return (
    <RoundedBox
      {...props}
      ref={ref}
      castShadow={true}
      position={[0, 0, 0.5]}
      radius={0.1}
      smoothness={4}
    >
      <meshStandardMaterial color={'#202020'}/>
    </RoundedBox>
  )
}

function BarrierTop(props) {
  const [ref] = usePlane(() => ({position: [0, 4, 4], rotation: [Math.PI / 2, 0, 0]}))

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={'blue'}/>
    </mesh>
  )
}

function BarrierBottom(props) {
  const [ref] = usePlane(() => ({position: [0, -4, 4], rotation: [-Math.PI / 2, 0, 0]}))

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={'blue'}/>
    </mesh>
  )
}

function BarrierLeft(props) {
  const [ref] = usePlane(() => ({position: [-4, 0, 4], rotation: [0, Math.PI / 2, 0]}))

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={'green'}/>
    </mesh>
  )
}

function BarrierRight(props) {
  const [ref] = usePlane(() => ({position: [4, 0, 4], rotation: [0, -Math.PI / 2, 0]}))

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={'green'}/>
    </mesh>
  )
}
