import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'

import appSlice from '../slices/app'
import {selectDeveloperMode} from '../selectors'


export default function useDeveloperMode() {
  const router = useRouter()
  const dispatch = useDispatch()
  const developerMode = useSelector(selectDeveloperMode)

  React.useEffect(() => {
    if (!router || !router.isReady) {
      return
    }

    dispatch(appSlice.actions.setDeveloperMode(!!router.query.dev))
  }, [router && router.isReady])

  return developerMode
}
