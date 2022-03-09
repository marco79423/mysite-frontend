import {useRouter} from 'next/router'
import React from 'react'
import {createGlobalState} from 'react-use'

const useGlobalState = createGlobalState(null)

export default function useDeveloperMode() {
  const router = useRouter()
  const [globalState, setGlobalState] = useGlobalState()

  React.useEffect(() => {
    if (!router || !router.isReady) {
      return
    }

    setGlobalState(!!router.query.dev)
  }, [router && router.isReady])

  return globalState
}
