import { produce } from 'immer'
import { CalculatorAction } from './actions'
import { ActionTypes } from './types'

export interface CalculatorState {
  stack: number[]
}

export const initialCalculatorState: CalculatorState = {
  stack: []
}

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction) => {
  switch (action.type) {
    case ActionTypes.ENTER:
      return produce(state, stateCopy => {
        stateCopy.stack.push(action.payload)
      })
    case ActionTypes.CLEAR:
      return initialCalculatorState
    case ActionTypes.DROP:
      return produce(state, stateCopy => {
        stateCopy.stack.pop()
      })
    case ActionTypes.SWAP:
      return produce(state, stateCopy => {
        if (state.stack.length > 1) {
          stateCopy.stack[state.stack.length - 1] = state.stack[state.stack.length - 2]
          stateCopy.stack[state.stack.length - 2] = state.stack[state.stack.length - 1]
        }
      })
    case ActionTypes.ADD:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ? // we check by type because the number 0 is falsy
          stateCopy.stack[state.stack.length - 1] += action.payload :
          stateCopy.stack[state.stack.length - 2] += stateCopy.stack.pop()! // ! because we check the length before dispatching
      })
    case ActionTypes.SUBTRACT:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ?
          stateCopy.stack[state.stack.length - 1] -= action.payload :
          stateCopy.stack[state.stack.length - 2] -= stateCopy.stack.pop()!
      })
    case ActionTypes.MULTIPLY:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ?
          stateCopy.stack[state.stack.length - 1] *= action.payload :
          stateCopy.stack[state.stack.length - 2] *= stateCopy.stack.pop()!
      })
    case ActionTypes.DIVIDE:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ?
          stateCopy.stack[state.stack.length - 1] /= action.payload :
          stateCopy.stack[state.stack.length - 2] /= stateCopy.stack.pop()!
      })
    case ActionTypes.POWER:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ?
          stateCopy.stack[state.stack.length - 1] **= action.payload :
          stateCopy.stack[state.stack.length - 2] **= stateCopy.stack.pop()!
      })
    case ActionTypes.TOGGLE_SIGN:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ? 
          stateCopy.stack.push(action.payload * -1) :
          stateCopy.stack[state.stack.length - 1] *= -1
      })
    case ActionTypes.SIN:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ? 
          stateCopy.stack.push(Math.sin(action.payload)) :
          stateCopy.stack[state.stack.length - 1] = Math.sin(stateCopy.stack[state.stack.length - 1])
      })
    case ActionTypes.COS:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ? 
          stateCopy.stack.push(Math.cos(action.payload)) :
          stateCopy.stack[state.stack.length - 1] = Math.cos(stateCopy.stack[state.stack.length - 1])
      })
    case ActionTypes.TAN:
      return produce(state, stateCopy => {
        (typeof action.payload === 'number') ? 
          stateCopy.stack.push(Math.tan(action.payload)) :
          stateCopy.stack[state.stack.length - 1] = Math.tan(stateCopy.stack[state.stack.length - 1])
      })
    
    default:
      return state
  }
}
