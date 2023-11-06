import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'store/reduxWrapper'

// namespace
export const ns = 'app'

export interface IAuth {
  userId: number
  userName: string
  clientId?: string
  isSkjDeveloper?: boolean
  isSms?: number
  termLanguage?: number
}

// state interface
export interface State {
  auth: IAuth | Record<string, never>
}

// initial state
const initialState: State = {
  auth: {}
}

// slice
const slice = createSlice({
  name: ns,
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth | Record<string, never>>) => {
      state.auth = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[ns],
      }
    },
  },
})


export const {actions} = slice
export default slice
