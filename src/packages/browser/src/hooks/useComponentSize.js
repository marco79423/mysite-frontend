import React, {useState} from 'react'

/**
 * @typedef {Object} ComponentSize
 * @property {boolean} ready - 是否長寬是否已更新
 * @property {number} width - Viewport 的寬度
 * @property {number} height - Viewport 的高度
 */

/**
 * 取得組件的大小 (未更新時 ready 為 false)
 * @param componentRef
 * @return {ComponentSize} size - 組件大小的資訊
 */
export default function useComponentSize(componentRef) {
  if (!componentRef) {
    throw new Error('必須要提供 ref (使用 useRef)')
  }

  const [size, setSize] = useState({width: 0, height: 0, ready: false})

  const updateSize = () => {
    if (componentRef.current) {
      setSize({
        width: componentRef.current.offsetWidth,
        height: componentRef.current.offsetHeight,
        ready: true,
      })
    }
  }

  React.useEffect(() => {
    updateSize()

    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [componentRef.current])

  return size
}
