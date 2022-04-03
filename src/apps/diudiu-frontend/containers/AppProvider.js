import React from 'react'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'
import {ProviderCompose} from '@paji-sdk/browser'

import store from '../store'
import theme from '../themes/defaultTheme'


/**
 * 所有 App 所需的 Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppProvider({children}) {
  return (
    <ProviderCompose.Composer providers={[
      // Material-UI 的 Theme Provider
      ProviderCompose.provider(ThemeProvider, {theme}),
      
      // Redux 的 Provider
      ProviderCompose.provider(Provider, {store}),
    ]}>
      {children}
    </ProviderCompose.Composer>
  )
}

export default AppProvider
