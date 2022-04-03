import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core'
import {Canvas} from '@react-three/fiber'
import {Physics} from '@react-three/cannon'

import {selectDieType} from '../selectors'
import useDeveloperMode from '../hooks/useDeveloperMode'
import Floor from '../components/diebox/Floor'
import Barrier from '../components/diebox/Barrier'
import useComponentSize from '../hooks/useComponentSize'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import useIsClientSideRendering from '../hooks/useIsClientSideRendering'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
})

export default function RollingDieBox({dieTypeId}) {
  const ref = React.useRef()
  const classes = useStyles()
  const developerMode = useDeveloperMode()
  const isClientSideRendering = useIsClientSideRendering()
  const {width, height, ready} = useComponentSize(ref)
  const dieType = useSelector(selectDieType(dieTypeId))

  React.useEffect(() => {
    if (developerMode) {
      console.log('啟動開發者模式')
      console.table({
      })
    }
  }, [developerMode])

  const dieWidth = Math.trunc(Math.min(width, height) / 5)

  React.useEffect(() => {
    if (developerMode && ready) {
      console.table({
        width, height, dieWidth
      }, ['width', 'height', 'dieWidth'])
    }
  }, [ready, developerMode])

  return (
    <div ref={ref} className={classes.root}>
      {
        (isClientSideRendering && ready) ? (
          <Canvas className={classes.canvas}>
            <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
              <PerspectiveCamera makeDefault position={[0, 0, dieWidth * 5]}/>

              {developerMode && <OrbitControls/>}

              <ambientLight color={0xf0f5fb}/>

              <Floor size={[width, height]} color={0xdfdfdf}/>

              {/* Top Barrier */}
              <Barrier
                position={[0, height / 2, 5000]}
                rotation={[Math.PI / 2, 0, 0]}
                size={[width, 10000]} color={developerMode ? 'blue' : null}/>
               Bottom Barrier
              <Barrier
                position={[0, -height / 2, 5000]}
                rotation={[-Math.PI / 2, 0, 0]}
                size={[width, 10000]} color={developerMode ? 'blue' : null}/>
              {/* Left Barrier */}
              <Barrier
                position={[-width / 2, 0, 5000]}
                rotation={[0, Math.PI / 2, 0]}
                size={[10000, height]} color={developerMode ? 'green' : null}/>
              {/* Right Barrier */}
              <Barrier
                position={[width / 2, 0, 5000]}
                rotation={[0, -Math.PI / 2, 0]}
                size={[10000, height]}  color={developerMode ? 'green' : null}/>
            </Physics>
          </Canvas>
        ) : null
      }
    </div>
  )
}
