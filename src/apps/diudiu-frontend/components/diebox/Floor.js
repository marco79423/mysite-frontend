import React from 'react'
import {usePlane} from '@react-three/cannon'

export default function Floor({size, color, ...props}) {
  const [ref] = usePlane(() => ({...props}))

  return (
    <mesh ref={ref} receiveShadow={true} {...props}>
      <planeGeometry args={size}/>
      <meshPhongMaterial color={color}/>
    </mesh>
  )
}
