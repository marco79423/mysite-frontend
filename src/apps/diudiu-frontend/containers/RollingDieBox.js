import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Debug, Physics} from '@react-three/cannon'
import {generateId} from '@paji-sdk/utils'

import {selectDieList, selectDieType} from '../selectors'
import useDeveloperMode from '../hooks/useDeveloperMode'
import useComponentSize from '../hooks/useComponentSize'
import useIsClientSideRendering from '../hooks/useIsClientSideRendering'
import Floor from '../components/diebox/Floor'
import Barrier from '../components/diebox/Barrier'
import Die from '../components/diebox/die'
import dieSlice from '../slices/die'

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
  const dispatch = useDispatch()
  const developerMode = useDeveloperMode()
  const isClientSideRendering = useIsClientSideRendering()
  const {width, height, ready} = useComponentSize(ref)
  const dieType = useSelector(selectDieType(dieTypeId))
  const dieList = useSelector(selectDieList)

  React.useEffect(() => {
    if (developerMode) {
      console.log('啟動開發者模式')
    }
  }, [developerMode])

  const dieSize = Math.trunc(Math.min(width, height) / 10)

  React.useEffect(() => {
    if (developerMode && ready) {
      console.table({
        width, height, dieWidth: dieSize
      }, ['width', 'height', 'dieWidth'])
    }
  }, [ready, developerMode])

  const addDie = () => {
    dispatch(dieSlice.actions.addOne({
      id: generateId(),
      type: dieType,
      rolling: false,
      defaultPosition: [Math.random() * width - width / 2, -height / 2, 5 * dieSize],
      defaultVelocity: [Math.random() * width - width / 2, -height / 2, 5 * dieSize * Math.random() - 2.5 * dieSize],
    }))
  }

  const updateDie = (id, changes) => {
    dispatch(dieSlice.actions.updateOne({
      id,
      changes,
    }))
  }

  React.useEffect(() => {
    if (ready) {
      addDie()
    }
  }, [ready])

  return (
    <div ref={ref} className={classes.root}>
      {
        (isClientSideRendering && ready) ? (
          <Canvas className={classes.canvas}>

            <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
              <Debug color="white">

                <PerspectiveCamera makeDefault position={[0, 0, dieSize * 5]}/>

                {developerMode ? <OrbitControls/> : null}

                <ambientLight color={0xf0f5fb}/>
                <spotLight
                  color={0xefdfd5}
                  intensity={20}
                  position={[-width, height / 2, dieSize * 5]}
                  distance={dieSize * 5}
                  castShadow={true}
                />

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
                  size={[10000, height]} color={developerMode ? 'green' : null}/>

                {
                  // Canvas 裡不能用 context (https://github.com/pmndrs/react-three-fiber/issues/43)
                  dieList.map(die => (
                    <Die key={die.id} die={die} update={updateDie} size={dieSize}/>
                  ))
                }
              </Debug>
            </Physics>
          </Canvas>
        ) : null
      }
    </div>
  )
}
