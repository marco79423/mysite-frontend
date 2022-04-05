import React from 'react'
import * as THREE from 'three'
import {useBox} from '@react-three/cannon'
import {Box} from '@react-three/drei'


export default function Die({die, update, size}) {
  const [ref, api] = useBox(() => ({mass: 1, position: die.defaultPosition, velocity: die.defaultVelocity}))

  const quaternion = React.useRef([0, 0, 0, 0])
  React.useEffect(() => api.quaternion.subscribe(result => quaternion.current = result), [])

  React.useEffect(() => {
    const unsubscribed = api.velocity.subscribe(v => {

      const [x, y, z] = v
      const rolling = Math.abs(x) + Math.abs(y) + Math.abs(z) > 0.5
      update(die.id, {
        rolling: true
      })

      if (!rolling) {
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

        update(die.id, {
          rolling: false,
          result: die.type.faces[closestFace],
        })
      }
    })

    return unsubscribed
  }, [])

  return (
    <Box ref={ref} args={[size, size, size]} position={die.defaultPosition} radius={size / 10} smoothness={4} castShadow={true}>
      {
        die.type.faces.map((face, i) => (
          <meshPhongMaterial
            attachArray="material"
            key={i}
            map={createTextTexture(face, 'white', '#202020')}
          />)
        )
      }
    </Box>
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

  return new THREE.CanvasTexture(canvas)
}
