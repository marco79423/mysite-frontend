import React from 'react'
import Head from 'next/head'
import {Canvas, useFrame} from '@react-three/fiber'
import {CssBaseline} from '@material-ui/core'

import useWindowSize from '../components/hooks/useWindowSize'

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
  return (<Canvas style={{background: 'blue', height, width}}>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Box position={[-1.2, 0, 0]}/>
      <Box position={[1.2, 0, 0]}/>
    </Canvas>)
}


function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false)
  const [clicked, click] = React.useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (<mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
    </mesh>)
}


