import React from 'react'

export default function useIsClientSideRendering() {
  const [isClientSideRendering, setIsClientSideRendering] = React.useState(false)

  React.useEffect(() => {
    setIsClientSideRendering(true)
  }, [])

  return isClientSideRendering
}
