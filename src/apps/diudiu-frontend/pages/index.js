import React from 'react'
import Head from 'next/head'
import {Canvas} from '@react-three/fiber'
import {CssBaseline} from '@material-ui/core'

import useWindowSize from '../components/hooks/useWindowSize'
import {OrbitControls} from '@react-three/drei'

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
    <Canvas style={{height, width}} shadows>
      <OrbitControls/>
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
