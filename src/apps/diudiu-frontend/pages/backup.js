import React from 'react'
import Head from 'next/head'
import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import {Physics, useBox} from '@react-three/cannon'
import useWindowSize from '../hooks/useWindowSize'
import {Box as BBox, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {generateID} from '@paji-sdk/utils'
import {Controls, withControls} from 'react-three-gui'
import {
  AppBar, Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Toolbar, Typography
} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CasinoIcon from '@mui/icons-material/Casino'
import {orange} from '@mui/material/colors'
import {createGlobalState, useList, useToggle} from 'react-use'
import useMotion from '../hooks/useMotion'
import Barrier from '../components/diebox/Barrier'
import useDeveloperMode from '../hooks/useDeveloperMode'
import {Floor} from '../components/diebox/Floor'
import ControlPanel from '../containers/ControlPanel'

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    }, secondary: {
      main: orange[100],
    },
  },
})

const useDiceState = createGlobalState({})

const WrappedCanvas = withControls(Canvas)

export default function Index() {
  return (<>
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
      <Controls.Provider>
        <App/>
      </Controls.Provider>
    </ThemeProvider>
  </>)
}

function App() {
  const {width, height} = useWindowSize()
  const [dice, {push, clear}] = useList()

  const [on, toggle] = useToggle(false)
  const developerMode = useDeveloperMode()
  const [diceState] = useDiceState()
  const state = useMotion()

  const stopped = Object.values(diceState).filter(moving => moving).length === 0

  const addDie = () => {
    push(<Die
      key={generateID()}
      position={[0, -3.5, 5]}
      velocity={[20 * Math.random() - 20 * Math.random(), 20 + 20 * Math.random(), -20 * Math.random()]}
    />)
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

  return (<>
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
        </Toolbar>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
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
      <WrappedCanvas style={{position: 'absolute', height, width, background: 'lightblue'}} shadows>
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

          {dice}
        </Physics>
      </WrappedCanvas>

      {developerMode ? <ControlPanel/> : null}
    </Box>
  </>)
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

  return texture
}

function Die({key, position, velocity, ...props}) {
  const [ref, api] = useBox(() => ({mass: 1, position: position, velocity: velocity}))
  const [diceState, setDiceState] = useDiceState()

  const quaternion = React.useRef([0, 0, 0, 0])
  React.useEffect(() => api.quaternion.subscribe(result => quaternion.current = result), [])

  React.useEffect(() => {
    const unsubscribed = api.velocity.subscribe(v => {
      const [x, y, z] = v
      const moving = Math.abs(x) + Math.abs(y) + Math.abs(z) > 0.5
      setDiceState({...diceState, [key]: moving})

      if (!moving) {
        unsubscribed()

        const [x, y, z, w] = quaternion.current
        const posAttribute = ref.current.geometry.attributes.position
        const indexAttribute = ref.current.geometry.index.array

        let closestFace
        let closestAngle = Math.PI * 2
        for (let f = 0; f < 6; f++) {
          const triangle = new THREE.Triangle(new THREE.Vector3(posAttribute.getX(indexAttribute[0 + (f * 6)]), posAttribute.getY(indexAttribute[0 + (f * 6)]), posAttribute.getZ(indexAttribute[0 + (f * 6)])), new THREE.Vector3(posAttribute.getX(indexAttribute[1 + (f * 6)]), posAttribute.getY(indexAttribute[1 + (f * 6)]), posAttribute.getZ(indexAttribute[1 + (f * 6)])), new THREE.Vector3(posAttribute.getX(indexAttribute[2 + (f * 6)]), posAttribute.getY(indexAttribute[2 + (f * 6)]), posAttribute.getZ(indexAttribute[2 + (f * 6)])),)
          const v = new THREE.Vector3()
          triangle.getNormal(v)
          const angle = v.applyQuaternion(new THREE.Quaternion(x, y, z, w)).angleTo(new THREE.Vector3(0, 0, 1))
          if (angle < closestAngle) {
            closestFace = f
            closestAngle = angle
          }
        }

        console.log('value', closestFace + 1)

      }
    })

    return unsubscribed
  }, [])

  return (<BBox
    {...props}
    ref={ref}
    castShadow={true}
    position={[0, 0, 0.5]}
    radius={0.1}
    smoothness={4}
  >
    {Array.from(Array(6)).map((_, i) => (
      <meshPhongMaterial attachArray="material" map={createTextTexture(i + 1, 'white', '#202020')} key={i}/>))}
  </BBox>)
}

