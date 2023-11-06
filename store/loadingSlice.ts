import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//namespace
export const ns = 'loading'

//interface
export interface Loading {
  open: boolean
}

const initialState: Loading = {
  open: false,
}
const loadingSlice = createSlice({
  name: ns,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Loading>) => {
      state.open = action.payload.open
    },
  },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice
