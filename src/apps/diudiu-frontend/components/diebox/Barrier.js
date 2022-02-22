import React from 'react'
import {usePlane} from '@react-three/cannon'

export default function Barrier({position, rotation, size, color, ...props}) {
  const [ref] = usePlane(() => ({position, rotation}))
  return (
    <mesh{...props} ref={ref}>
      <planeGeometry args={size}/>
      <meshPhongMaterial color={color}/>
    </mesh>
  )
}
