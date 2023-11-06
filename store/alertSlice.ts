import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//namespace
export const ns = 'alert'

//interface
export interface Alert {
  open: boolean
  type: 'success' | 'error' | 'warning'
  msg: string
}

const initialState: Alert = {
  open: false,
  type: 'success',
  msg: '',
}
const alertSlice = createSlice({
  name: ns,
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.open = action.payload.open
      state.type = action.payload.type
      state.msg = action.payload.msg
    },
  },
})

export const { setAlert } = alertSlice.actions
export default alertSlice
