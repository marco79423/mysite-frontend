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

  return (
    <DieWorld
      width={width}
      height={height}
    />
  )
}

function DieWorld({width, height}) {

  return (
    <WrappedCanvas style={{height, width, background: 'lightblue'}} shadows>
      <Physics gravity={[0, 0, -10]} defaultContactMaterial={{friction: 0.01, restitution: 0.5}}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]}/>
        <ambientLight color={0xf0f5fb}/>
        <spotLight
          color={0xefdfd5}
          intensity={20}
          position={[-2, 2, 2]}
          distance={5}
          castShadow={true}
        />
      </Physics>
    </WrappedCanvas>
  )
}
