import React from 'react'
import Head from 'next/head'
import * as THREE from 'three'
import {addAfterEffect, addEffect, Canvas, extend, useFrame, useLoader} from '@react-three/fiber'
import useWindowSize from '../components/hooks/useWindowSize'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import setoFont from './SetoFont_Regular.json'
import {Circle, MapControls, OrthographicCamera, PerspectiveCamera, Plane, useCursor} from '@react-three/drei'
import StatsImpl from 'stats.js'
import {Controls, useControl, withControls} from 'react-three-gui'

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
  Toolbar,
  Typography
} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CasinoIcon from '@mui/icons-material/Casino'
import {orange} from '@mui/material/colors'
import {createGlobalState, useToggle} from 'react-use'
import {useRouter} from 'next/router'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import renderToCanvas from '../components/renderToCanvas'

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
const WrappedCanvas = withControls(Canvas)

extend({TextGeometry})

export default function Index() {

  React.useEffect(() => {
    const $style = document.createElement('style')
    $style.id = 'styles'
    $style.innerHTML = `
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    `
    document.head.appendChild($style)
  }, [])

  return (
    <>
      <Head>
        <title>關係計算機</title>
        <meta name="description" content="關係計算機"/>
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
    </>
  )
}

function App() {
  const router = useRouter()

  React.useEffect(() => {
    if (!router.isReady) {
      return
    }
    setDeveloperMode(!!router.query.dev)
  }, [router.isReady])

  const {width, height} = useWindowSize()
  const showStats = useControl('顯示 FPS', {
    type: 'boolean',
  })


  const [on, toggle] = useToggle(false)
  const [developerMode, setDeveloperMode] = useDeveloperMode()

  const dir = new THREE.Vector3(0, 1, 0)
  const origin = new THREE.Vector3(0, 30, 0)
  const length = 100
  const hex = 'green'
  const headLength = 20
  const headWidth = 20

  React.useEffect(() => {
    const container = document.getElementById('container')

    // 建立繪製器 (Renderer)
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // 建立場景 (Scene)
    const scene = new THREE.Scene()

    // 建立相機 (Camera)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const ambientLight = new THREE.AmbientLight(0xf0f5fb, 100)
    scene.add(ambientLight)

    // 建立模型、材質並放置到場景
    // const cubeGeometry = new THREE.BoxGeometry()
    // const cubeMaterial = new THREE.MeshBasicMaterial({color: 'green'})
    // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    // scene.add(cube)

    const createNode = (text) => {
      const [radius, segments] = [1, 64]
      // const [hovered, setHovered] = React.useState(false)
      const nodeGeometry = new THREE.CircleGeometry(radius, segments)
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 'blue',
        map: createTextTexture(text, 'white', '#202020')
      })

      return new THREE.Mesh(nodeGeometry, nodeMaterial)
    }

    scene.add(createNode('我'))


    // 繪製循環
    const animate = function () {
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <>
      <Box sx={{position: 'absolute', display: 'flex', touchAction: 'none', flexDirection: 'column', width, height}}>
        <Box component={AppBar} position="relative" sx={{zIndex: 1}}>
          <Toolbar>
            <CasinoIcon sx={{mr: 2}}/>
            <Box sx={{userSelect: 'none'}}>
              <Typography variant="h6" color="inherit" noWrap>
                關係計算機
              </Typography>
            </Box>
          </Toolbar>
        </Box>

        <div id="container"/>
        {/*  <WrappedCanvas style={{position: 'absolute', height, width, background: 'lightblue'}} shadows>*/}
        {/*    <MapControls/>*/}
        {/*    /!*<PerspectiveCamera makeDefault position={[0, 0, 10]}/>*!/*/}
        {/*    <OrthographicCamera makeDefault position={[0, 0, 10]}/>*/}
        {/*    <ambientLight color={0xf0f5fb} intensity={100}/>*/}

        {/*    <arrowHelper args={[dir, origin, length, hex, headLength, headWidth]}/>*/}
        {/*    <Node text={'我'}/>*/}
        {/*    /!*<Text position={[15, 60, 0]} text={'Apple'}/>*!/*/}
        {/*    <Text position={[15, 60, 0]} text={'爸爸'}/>*/}
        {/*    <Node text={'父'} position={[0, 160, 0]}/>*/}
        {/*  </WrappedCanvas>*/}
      </Box>

      {/*{developerMode && showStats ? <Stats/> : null}*/}
      {/*{developerMode ? <Controls title="開發者控制台" style={{zIndex: 9999}}/> : null}*/}
    </>
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

  return texture
}

function Text({text, position, ...props}) {
  const font = new FontLoader().parse(setoFont)
  const textOptions = {
    font,
    size: 20,
    height: 30,
  }

  return (
    <mesh position={position} {...props}>
      <textGeometry attach="geometry" args={[text, textOptions]}/>
      <meshStandardMaterial attach="material" color={'black'}/>
    </mesh>
  )
}

function Node({key, position, text, ...props}) {
  const [radius, segments] = [30, 64]
  const [hovered, setHovered] = React.useState(false)

  useCursor(hovered)

  const createTextTexture = (text, color, backColor) => {
    const size = 100
    const textMargin = 1

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const ts = calculateTextureSize(size + size * 2 * textMargin) * 2
    canvas.width = canvas.height = ts
    console.log(ts)
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

  const createTextTexture2 = (text, color, backColor) => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 512
    renderToCanvas({
      canvas,
      width: 512,
      height: 512,
      Component: () => <div style={{color, background: backColor}}>{text}</div>
    })

    const texture = new THREE.CanvasTexture(canvas)

    return texture
  }

  return (
    <Circle
      {...props}
      args={[radius, segments]}
      position={position}

      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhongMaterial attach="material" map={createTextTexture2(text, 'white', '#202020')}
                         color={hovered ? 'green' : 'blue'}/>
    </Circle>
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
