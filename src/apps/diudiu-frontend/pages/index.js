import React, {useRef} from 'react'
import Head from 'next/head'
import {Canvas} from '@react-three/fiber'
import {Physics, useBox, usePlane} from '@react-three/cannon'

import useWindowSize from '../components/hooks/useWindowSize'
import {OrbitControls, PerspectiveCamera, RoundedBox, useHelper} from '@react-three/drei'
import {CameraHelper} from 'three'
import {Button, CssBaseline, Grid} from '@mui/material'

export default function Index() {
  const {width, height} = useWindowSize()


  return (<>
    <Head>
      <title>丟丟</title>
      <meta name="description" content="丟丟"/>
      <meta name="viewport" content="initial-scale=1, width=device-width"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <CssBaseline/>

    <DiceBox width={width} height={height}/>
  </>)
}

function DiceBox({width, height}) {
  const [dice, setDice] = React.useState([])

  const addDie = () => {
    setDice([
      ...dice,
      <Die position={[0, -3.5, 5]} velocity={[20 * Math.random() - 20 * Math.random(), 20 + 20 * Math.random(), -20 * Math.random()]}/>
    ])
  }

  return (
    <main style={{width, height}}>
      <div style={{display: 'relative', position: 'absolute', width, height}}>
        <Grid container alignItems="center" justifyContent="center" style={{height: '100%'}}>
          <Grid item>
            <Button onClick={addDie} variant="contained" style={{zIndex: 9, fontSize: '3rem'}}>丟</Button>
          </Grid>
        </Grid>
      </div>

      <Canvas style={{position: 'absolute', height, width, background: 'lightblue'}} shadows>
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

          {dice}
        </Physics>
      </Canvas>
    </main>
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

function Die({position, velocity, ...props}) {
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
