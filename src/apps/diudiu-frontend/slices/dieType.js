import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

// Slice
export const entityAdapter = createEntityAdapter()
const dieTypeSlice = createSlice({
  name: 'dieType',
  initialState: entityAdapter.getInitialState(),
  reducers: {
    setAll: entityAdapter.setAll,
  }
})

// Reducer
export default dieTypeSlice
