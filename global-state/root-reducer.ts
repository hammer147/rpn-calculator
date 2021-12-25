import { CalculatorAction } from './calculator/actions'
import { calculatorReducer, CalculatorState, initialCalculatorState } from './calculator/reducer'

export interface RootState {
  calculator: CalculatorState
}

export const initialState: RootState = {
  calculator: initialCalculatorState
}

export type Action = CalculatorAction

export const rootReducer = (state: RootState, action: Action) => ({
  ...state,
  calculator: calculatorReducer(state.calculator, action as CalculatorAction)
})
