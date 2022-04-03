import React from 'react'
import useIsClientSideRendering from './useIsClientSideRendering'

export default function useComponentSize(componentRef) {
  if (!componentRef) {
    throw new Error('必須要提供 ref (使用 useRef)')
  }

  const [r, setR] = React.useState(0)
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
    ready: false,
  })

  const getSize = () => ({
    width: componentRef.current.offsetWidth,
    height: componentRef.current.offsetHeight,
  })

  React.useEffect(() => {
    // 確保是可以讀取 size 的狀態
    const size = getSize()
    if (!componentRef.current || size.width * size.height === 0) {
      setTimeout(() => {
        setR(Math.random())
      }, 100)
      return
    }

    const setComponentSize = () => {
      if (componentRef.current) {
        setSize({
          ...getSize(),
          ready: true,
        })
      }
    }

    setComponentSize()
    window.addEventListener('resize', setComponentSize)

    return () => {
      window.removeEventListener('resize', setComponentSize)
    }
  }, [componentRef.current, r])

  return size
}
