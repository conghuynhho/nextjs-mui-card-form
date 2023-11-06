import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import appSlice from './appSlice'
import { AnyAction, CombinedState, Reducer } from 'redux'
import { Slice } from '@reduxjs/toolkit/src/createSlice'
import alertSlice from './alertSlice'
import loadingSlice from './loadingSlice'
import { createWrapper } from './reduxWrapper'
import getConfig from 'next/config'
//import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
//import logger from 'redux-logger'

/**
 * Default reducers like global/common reducer
 */
const staticReducers = {
  [appSlice.name]: appSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
}
export const reducerManager = createReducerManager(staticReducers)
const { publicRuntimeConfig: {ENV}} = getConfig()
const notProd = ENV !== 'production'

const store = configureStore(Object.assign({
  reducer: reducerManager.reduce,
  devTools: notProd,
}, notProd ? {
  //middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware().concat(logger),
} : {},
))

const makeStore = () => store
export const sw = createWrapper<AppStore>(makeStore)

/**
 * https://redux.js.org/usage/code-splitting#using-a-reducer-manager
 * Create reducer manager for dynamic reducer
 * @param initReducers
 */
export function createReducerManager(initReducers: {
  [name: string]: Reducer
}) {
  // Create an object which maps keys to reducers
  const reducers = { ...initReducers }
  const slices = {}
  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: string[] = []

  return {
    getReducerMap: () => reducers,
    getSliceByName: (name: string) => {
      // @ts-ignore
      return slices[name]
    },
    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (
      state: CombinedState<{ [x: string]: any }> | undefined,
      action: AnyAction
    ) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (const key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combineReducers(reducers)(state, action)
    },

    // Adds a new reducer with the specified key
    add: (s: Slice | Slice[]) => {
      const arr: Slice[] = Array.isArray(s) ? s : [s]
      arr.forEach((e) => {
        if (!e.name || reducers[e.name]) {
          return
        }
        // Add the reducer to the reducer mapping
        reducers[e.name] = e.reducer
        // @ts-ignore
        slices[e.name] = e
      })

      // Generate a new combined reducer
      store.replaceReducer(combineReducers(reducers))
      sw.triggerHydrate()
    },

    // Removes a reducer with the specified key
    remove: (key: string | string[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Slice is not deleted on development mode, please reload the page to avoid outdated slice')
        return
      }
      const arr: string[] = Array.isArray(key) ? key : [key]
      arr.forEach(e => {
        if (!e || !reducers[e]) {
          return
        }
        // Remove it from the reducer mapping
        delete reducers[e]
        // @ts-ignore
        delete slices[e]
        // Add the key to the list of keys to clean up
        keysToRemove.push(e)
      })

      // Generate a new combined reducer
      store.replaceReducer(combineReducers(reducers))
    }
    ,
    restoreReducer: () => {
      // @ts-ignore
      store.replaceReducer(combineReducers(staticReducers))
    }
  }
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

