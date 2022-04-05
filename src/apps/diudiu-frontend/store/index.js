import {combineReducers, configureStore} from '@reduxjs/toolkit'

import appSlice from '../slices/app'
import dieBoxSlice from '../slices/dieBox'
import dieTypeSlice from '../slices/dieType'
import dieSlice from '../slices/die'

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    dieBox: dieBoxSlice.reducer,
    dieType: dieTypeSlice.reducer,
    die: dieSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),],
})

export default store
