import {createSlice} from '@reduxjs/toolkit'

// Slice
const dieBoxSlice = createSlice({
  name: 'dieBox',
  initialState: {
    rolling: false,
    resultValue: null
  },
  reducers: {
    setRolling: (state, action) => {
      state.rolling = action.payload
    },

    setResultValue: (state, action) => {
      state.resultValue = action.payload
    },
  }
})

// Reducer
export default dieBoxSlice
