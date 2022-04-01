import React from 'react'
import {makeStyles} from '@material-ui/core'
import {Canvas, useThree} from '@react-three/fiber'
import {OrthographicCamera} from '@react-three/drei'

import useDeveloperMode from '../hooks/useDeveloperMode'
import {Floor} from '../components/diebox/Floor'
import Barrier from '../components/diebox/Barrier'
import {Physics} from '@react-three/cannon'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },


})

export default function RollingDieBox({dieId}) {
  const classes = useStyles()
  const developerMode = useDeveloperMode()

  return (
    <Canvas className={classes.root}>
      <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>

        <OrthographicCamera makeDefault position={[0, 0, 10]}/>

        <Floor size={[8, 8]} color={0xdfdfdf}/>

        {/* Top Barrier */}
        <Barrier position={[0, 4, 4]} rotation={[Math.PI / 2, 0, 0]} size={[8, 8]}
                 color={developerMode ? 'blue' : null}/>
        {/* Bottom Barrier */}
        <Barrier position={[0, -4, 4]} rotation={[-Math.PI / 2, 0, 0]} size={[8, 8]}
                 color={developerMode ? 'blue' : null}/>
        {/* Left Barrier */}
        <Barrier position={[-4, 0, 4]} rotation={[0, Math.PI / 2, 0]} size={[8, 8]}
                 color={developerMode ? 'green' : null}/>
        {/* Right Barrier */}
        <Barrier position={[4, 0, 4]} rotation={[0, -Math.PI / 2, 0]} size={[8, 8]}
                 color={developerMode ? 'green' : null}/>
      </Physics>
    </Canvas>
  )
}
