import * as React from 'react'
import {Provider} from 'react-redux'

import store from './store'
import getRoutes from './routes';

import 'purecss/build/pure.css'
import '../../../css/base.scss'


export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {getRoutes()}
      </Provider>
    )
  }
}

export default App
