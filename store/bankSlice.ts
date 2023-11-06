import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from './reduxWrapper'

export const nsBank = 'updateBank'

export interface IBankInfo {
  bankName: string
  bankBranchName: string
  accountType: number
  accountNumber: string
  accountHolder: string
  bankType: number
}

type initialStateType = {
  bankInfoArr: IBankInfo[],
  focusCardStyles: string | null
}

const bankInfoArrInitial: IBankInfo[] = [
  {
    bankName: '',
    bankBranchName: '',
    accountType: 1,
    accountNumber: '',
    accountHolder: '',
    bankType: 1,
  },
  {
    bankName: '',
    bankBranchName: '',
    accountType: 1,
    accountNumber: '',
    accountHolder: '',
    bankType: 2,
  },
]

const initialState: initialStateType = {
  bankInfoArr: bankInfoArrInitial,
  focusCardStyles: null
}

const slice = createSlice({
  name: nsBank,
  initialState,
  reducers: {
    setBankInfo: (state, action: PayloadAction<IBankInfo[]>) => {
      if (action.payload.length == 0) {
        state.bankInfoArr = bankInfoArrInitial
      } else {
        if (action.payload.length == 1) {
          state.bankInfoArr[0] = action.payload[0]
          state.bankInfoArr[1] = {
            bankName: '',
            bankBranchName: '',
            accountType: 1,
            accountNumber: '',
            accountHolder: '',
            bankType: 2,
          }
        } else {
          state.bankInfoArr = action.payload
        }
      }
    },
    setFocusCardStyles: (state, action: PayloadAction<string | null>) => {
      state.focusCardStyles = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[nsBank],
      }
    },
  },
})

export const updateBankInfo: any = async (data: IBankInfo[]) => {
  console.log(data)
  return {}
}


export const {actions} = slice
export default slice
