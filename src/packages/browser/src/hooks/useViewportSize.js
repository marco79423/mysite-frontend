import React from 'react'


/**
 * @typedef {Object} ViewportSize
 * @property {boolean} ready - 是否長寬是否已更新
 * @property {number} width - Viewport 的寬度
 * @property {number} height - Viewport 的高度
 */

/**
 * 取得顯示區域的大小 (未更新時 ready 為 false)
 * @returns {ViewportSize} size - 顯示區域大小的資訊
 */
export default function useViewportSize() {
  const [size, setSize] = React.useState({width: 0, height: 0, ready: false})

  function updateSize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
      ready: true,
    })
  }

  React.useEffect(() => {
    updateSize()

    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return size
}
