import React from 'react'
import Head from 'next/head'
import * as THREE from 'three'
import {addAfterEffect, addEffect, Canvas} from '@react-three/fiber'
import {Physics, useBox, usePlane} from '@react-three/cannon'
import useWindowSize from '../components/hooks/useWindowSize'
import {Box as BBox, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {generateID} from '@paji-sdk/utils'
import StatsImpl from 'stats.js'

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography
} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CasinoIcon from '@mui/icons-material/Casino'
import {orange} from '@mui/material/colors'
import {createGlobalState, useList, useToggle} from 'react-use'
import useMotion from '../components/hooks/useMotion'
import {useRouter} from 'next/router'

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    }, secondary: {
      main: orange[100],
    },
  },
})

const useDeveloperMode = createGlobalState(false)
const useDiceState = createGlobalState({})

// function getDieNumber(die) {
//   console.log('==== begin')
//   const vector = new THREE.Vector3(0, 0, 1)
//
//   let closest_face = null
//   let closest_angle = Math.PI * 2
//   for (let i = 0; i < die.geometry.groups.length; ++i) {
//     console.log('i', i)
//     const face = die.geometry.groups[i]
//     const angle = face.normal.clone().applyQuaternion(die.body.quaternion).angleTo(vector)
//     console.log('angle', angle)
//
//     if (angle < closest_angle) {
//       closest_angle = angle;
//       closest_face = face;
//     }
//
//     console.log('angle / closest_angle', angle, closest_angle)
//   }
//   const index = closest_face.materialIndex - 1
//   console.log('index', index)
//   console.log('==== end')
//   return index
// }

export default function Index() {
  const router = useRouter()
  React.useEffect(()=>{
    if(!router.isReady) {
      return
    }
    setDeveloperMode(!!router.query.dev)
  }, [router.isReady]);

  const {width, height} = useWindowSize()
  const [dice, {push, clear}] = useList()

  const [on, toggle] = useToggle(false)
  const [developerMode, setDeveloperMode] = useDeveloperMode()
  const [diceState] = useDiceState()
  const state = useMotion()

 const stopped = Object.values(diceState).filter(moving => moving).length === 0

  const addDie = () => {
    push(
      <Die
        key={generateID()}
        position={[0, -3.5, 5]}
        velocity={[20 * Math.random() - 20 * Math.random(), 20 + 20 * Math.random(), -20 * Math.random()]}
      />
    )
  }

  const moving = Math.pow(state.acceleration.x, 2) + Math.pow(state.acceleration.y, 2) + Math.pow(state.acceleration.y, 3) > 10
  const [addWait, setAddWait] = React.useState(false)
  React.useEffect(() => {
    if (moving) {
      setAddWait(true)
    }
  }, [moving])

  React.useEffect(() => {
    if (addWait && !moving) {
      addDie()
      setAddWait(false)
    }
  }, [addWait, moving])

  const dieCount = dice.length

  const showDialog = () => {
    toggle(true)
  }

  const hideDialog = () => {
    toggle(false)
  }

  const clearDice = () => {
    clear()
    hideDialog()
  }


  return (
    <>
      <Head>
        <title>丟丟</title>
        <meta name="description" content="丟丟"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CssBaseline/>

      <ThemeProvider theme={theme}>
        <Box sx={{position: 'absolute', display: 'flex', touchAction: 'none', flexDirection: 'column', width, height}}>
          <Box component={AppBar} position="relative" sx={{zIndex: 1}}>
            <Toolbar>
              <CasinoIcon sx={{mr: 2}}/>
              <Box sx={{userSelect: 'none'}}>
                <Typography variant="h6" color="inherit" noWrap>
                  丟丟
                </Typography>
              </Box>
              {moving ? 'true' : 'false'}|{state.granted ? 'granted' : 'denied'}|{stopped ? 'stopped' : 'moving'}
              <Box sx={{flexGrow: 1}}/>
              <nav style={{display: 'flex', alignItem: 'center'}}>
                {/*<Link*/}
                {/*  variant="button"*/}
                {/*  color="text.primary"*/}
                {/*  href="#"*/}
                {/*  sx={{my: 1, mx: 1.5}}*/}
                {/*>*/}
                {/*  分類*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*  variant="button"*/}
                {/*  color="text.primary"*/}
                {/*  href="#"*/}
                {/*  sx={{my: 1, mx: 1.5}}*/}
                {/*>*/}
                {/*  台灣名人骰*/}
                {/*</Link>*/}
              </nav>
              <Box sx={{flexGrow: 1}}/>
              {/*<Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>*/}
              {/*  我的*/}
              {/*</Button>*/}
            </Toolbar>
          </Box>
          <Box
            component="main"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{flex: 1, position: 'relative'}}>
              <Fab color="primary" aria-label="丟" onClick={addDie}
                   style={{zIndex: 9, fontSize: '3rem', width: 80, height: 80, userSelect: 'none'}}>
                丟
              </Fab>

              <Fab color="secondary" variant="extended" aria-label="丟" onClick={showDialog}
                   style={{zIndex: 9, fontSize: '2rem', position: 'fixed', right: 32, bottom: 32, userSelect: 'none'}}>
                統計
              </Fab>

              <Dialog onClose={hideDialog} open={on}>
                <DialogTitle sx={{m: 0, p: 2}}>統計</DialogTitle>
                <DialogContent dividers>
                  <Typography>你丟了： {dieCount} 次</Typography>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={clearDice}>清空</Button>
                  <Button variant="contained" autoFocus onClick={hideDialog}>確認</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Canvas style={{position: 'absolute', height, width, background: 'lightblue'}} shadows>
            <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
              {developerMode && <OrbitControls/>}
              {developerMode && <axesHelper/>}

              <PerspectiveCamera makeDefault position={[0, 0, 10]}/>
              <ambientLight color={0xf0f5fb}/>
              <spotLight
                color={0xefdfd5}
                intensity={20}
                position={[-2, 2, 2]}
                distance={5}
                castShadow={true}
              />

              <Desk/>

              <PlaneTop/>
              <PlaneBottom/>
              <PlaneLeft/>
              <PlaneRight/>

              {dice}
            </Physics>
          </Canvas>
        </Box>
      </ThemeProvider>

      {developerMode ? <Stats/> : null}
    </>
  )
}

function Desk(props) {
  const [ref] = usePlane(() => ({...props}))

  return (
    <mesh{...props} ref={ref} receiveShadow={true}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={0xdfdfdf}/>
    </mesh>
  )
}

const calculateTextureSize = (approx) => {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)))
}

const createTextTexture = (text, color, backColor) => {
  const size = 100
  const textMargin = 1

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const ts = calculateTextureSize(size + size * 2 * textMargin) * 2
  canvas.width = canvas.height = ts
  context.font = ts / (1 + 2 * textMargin) + 'pt Arial'
  context.fillStyle = backColor
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = color
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  return texture
}

function Die({key, position, velocity, ...props}) {
  const [ref, api] = useBox(() => ({mass: 1, position: position, velocity: velocity}))
  const [diceState, setDiceState] = useDiceState()

  React.useEffect(() => {
    return api.velocity.subscribe(v => {
      const [x, y, z] = v
      const moving = Math.abs(x) + Math.abs(y) + Math.abs(z) > 0.5
      setDiceState({...diceState, [key]: moving})
    })
  }, [])

  return (
    <BBox
      {...props}
      ref={ref}
      castShadow={true}
      position={[0, 0, 0.5]}
      radius={0.1}
      smoothness={4}
    >
      {Array.from(Array(6)).map((_, i) => (
        <meshPhongMaterial attachArray="material" map={createTextTexture(i + 1, 'white', '#202020')} key={i}/>
      ))}
    </BBox>
  )
}

function PlaneTop(props) {
  const [ref] = usePlane(() => ({position: [0, 4, 4], rotation: [Math.PI / 2, 0, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'blue' : null}/>
    </mesh>
  )
}

function PlaneBottom(props) {
  const [ref] = usePlane(() => ({position: [0, -4, 4], rotation: [-Math.PI / 2, 0, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'blue' : null}/>
    </mesh>
  )
}

function PlaneLeft(props) {
  const [ref] = usePlane(() => ({position: [-4, 0, 4], rotation: [0, Math.PI / 2, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'green' : null}/>
    </mesh>
  )
}

function PlaneRight(props) {
  const [ref] = usePlane(() => ({position: [4, 0, 4], rotation: [0, -Math.PI / 2, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'green' : null}/>
    </mesh>
  )
}

function Stats() {
  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(0)
    stats.dom.style.top = null
    stats.dom.style.bottom = '0'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(1)
    stats.dom.style.top = null
    stats.dom.style.bottom = 0
    stats.dom.style.left = '80px'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(2)
    stats.dom.style.top = null
    stats.dom.style.bottom = 0
    stats.dom.style.left = '160px'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  return null
}
