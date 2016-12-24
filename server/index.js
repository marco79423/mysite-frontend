import Express from 'express'
import * as React from 'react'
import * as Immutable from 'immutable'
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'

import getRoutes from '../src/js/containers/app/routes'
import reducer from '../src/js/ducks/reducer'

const app = Express()
const port = 3000

const stateTransformer = (state) => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS()
  else return state
}

function renderFullPage(html, state) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>兩大類 x 兩大類 = 四大類</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
    </html>
  `
}

function handleRender(req, res) {
  const initialState = Immutable.Map()
  const history = createMemoryHistory(req.path)

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      createLogger({stateTransformer}),
      thunk,
      routerMiddleware(history)
    )
  )

  match({ routes: getRoutes(history), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.send(500, error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const state = store.getState()
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      res.send(renderFullPage(html, state))
      // res.send(200, renderToString(<RoutingContext {...renderProps} />))
    } else {
      res.send(404, 'Not found')
    }
  })

  // res.send(renderFullPage(state))
}

app.use(Express.static('assets'));
app.use(handleRender)

app.listen(port)