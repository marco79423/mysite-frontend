import {usePlane} from '@react-three/cannon'
import React from 'react'

export function Floor({size, color, ...props}) {
  const [ref] = usePlane(() => ({...props}))

  return (
    <mesh{...props} ref={ref} receiveShadow={true}>
      <planeGeometry args={size}/>
      <meshPhongMaterial color={color}/>
    </mesh>
  )
}
