import React from 'react'
import {Controls, useControl} from 'react-three-gui'

import Stats from './Stats'

export default function ControlPanel() {
  const showStats = useControl('顯示 FPS', {
    type: 'boolean',
  })

  return (
    <>
      <Controls title="開發者控制台" style={{zIndex: 9999}}/>

      {showStats ? <Stats/> : null}
    </>
  )
}

