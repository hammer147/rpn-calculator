import { createContext, Dispatch } from 'react'
import { Action, initialState, RootState } from './root-reducer'

interface AppContext {
  state: RootState
  dispatch: Dispatch<Action>
}

export const AppContext = createContext<AppContext>({ state: initialState, dispatch: () => null })
