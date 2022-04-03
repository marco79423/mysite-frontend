import {createSlice} from '@reduxjs/toolkit'

// Slice
const appSlice = createSlice({
  name: 'app',
  initialState: {
    developerMode: false,
  },
  reducers: {
    setDeveloperMode: (state, action) => {
      state.developerMode = action.payload
    },
  }
})

// Reducer
export default appSlice
