import React from 'react'
import Head from 'next/head'
import {Canvas} from '@react-three/fiber'
import {Physics, useBox, usePlane} from '@react-three/cannon'
import useWindowSize from '../components/hooks/useWindowSize'
import {OrbitControls, PerspectiveCamera, RoundedBox} from '@react-three/drei'

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog, DialogActions, DialogContent,
  DialogTitle,
  Fab, FormControlLabel, FormGroup, Switch,
  Toolbar,
  Typography
} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CasinoIcon from '@mui/icons-material/Casino'
import {orange} from '@mui/material/colors'
import {createGlobalState, useList, useToggle} from 'react-use'

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


export default function Index() {
  const {width, height} = useWindowSize()
  const [dice, {push, clear}] = useList()

  const [on, toggle] = useToggle(false)
  const [developerMode, setDeveloperMode] = useDeveloperMode()

  const dieCount = dice.length

  const addDie = () => {
    push(<Die
      position={[0, -3.5, 5]}
      velocity={[20 * Math.random() - 20 * Math.random(), 20 + 20 * Math.random(), -20 * Math.random()]}
    />)
  }

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
              <FormGroup>
                <FormControlLabel control={<Switch color="secondary" checked={developerMode}
                                                   onChange={(e) => setDeveloperMode(e.target.checked)}/>}
                                  label="開發者模式"/>
              </FormGroup>
              <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>
                我的
              </Button>
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

              <BarrierTop/>
              <BarrierBottom/>
              <BarrierLeft/>
              <BarrierRight/>

              {dice}
            </Physics>
          </Canvas>
        </Box>
      </ThemeProvider>
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

function Die({position, velocity, ...props}) {
  const [ref] = useBox(() => ({mass: 1, position: position, velocity: velocity}))

  return (<RoundedBox
    {...props}
    ref={ref}
    castShadow={true}
    position={[0, 0, 0.5]}
    radius={0.1}
    smoothness={4}
  >
    <meshStandardMaterial color={'#202020'}/>
  </RoundedBox>)
}

function BarrierTop(props) {
  const [ref] = usePlane(() => ({position: [0, 4, 4], rotation: [Math.PI / 2, 0, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'blue' : null}/>
    </mesh>
  )
}

function BarrierBottom(props) {
  const [ref] = usePlane(() => ({position: [0, -4, 4], rotation: [-Math.PI / 2, 0, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'blue' : null}/>
    </mesh>
  )
}

function BarrierLeft(props) {
  const [ref] = usePlane(() => ({position: [-4, 0, 4], rotation: [0, Math.PI / 2, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'green' : null}/>
    </mesh>
  )
}

function BarrierRight(props) {
  const [ref] = usePlane(() => ({position: [4, 0, 4], rotation: [0, -Math.PI / 2, 0]}))
  const [developerMode] = useDeveloperMode()

  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={[8, 8]}/>
      <meshPhongMaterial color={developerMode ? 'green' : null}/>
    </mesh>
  )
}
