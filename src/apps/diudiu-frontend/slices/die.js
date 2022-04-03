import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

// Slice
export const entityAdapter = createEntityAdapter()
const dieSlice = createSlice({
  name: 'die',
  initialState: entityAdapter.getInitialState(),
  reducers: {
    addOne: entityAdapter.addOne,
    updateOne: entityAdapter.updateOne,
  }
})

// Reducer
export default dieSlice
