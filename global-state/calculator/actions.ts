import { ActionTypes } from './types'

// typing actions

interface EnterAction { type: ActionTypes.ENTER; payload: number }
interface ClearAction { type: ActionTypes.CLEAR }
interface DropAction { type: ActionTypes.DROP }
interface SwapAction { type: ActionTypes.SWAP }

interface AddAction { type: ActionTypes.ADD; payload?: number}
interface SubtractAction { type: ActionTypes.SUBTRACT; payload?: number}
interface MultiplyAction { type: ActionTypes.MULTIPLY; payload?: number}
interface DivideAction { type: ActionTypes.DIVIDE; payload?: number}
interface PowerAction { type: ActionTypes.POWER; payload?: number}

interface ToggleSignAction { type: ActionTypes.TOGGLE_SIGN; payload?: number}
interface SinAction { type: ActionTypes.SIN; payload?: number}
interface CosAction { type: ActionTypes.COS; payload?: number}
interface TanAction { type: ActionTypes.TAN; payload?: number}

// discriminated union

export type CalculatorAction =
  | EnterAction
  | ClearAction
  | DropAction
  | SwapAction
  | AddAction
  | SubtractAction
  | MultiplyAction
  | DivideAction
  | PowerAction
  | ToggleSignAction
  | SinAction
  | CosAction
  | TanAction

// action creators

export const enter = (val: number): EnterAction => ({ type: ActionTypes.ENTER, payload: val })
export const clear = (): ClearAction => ({ type: ActionTypes.CLEAR })
export const drop = (): DropAction => ({ type: ActionTypes.DROP })
export const swap = (): SwapAction => ({ type: ActionTypes.SWAP })

export const add = (x?: number): AddAction => ({ type: ActionTypes.ADD, payload: x })
export const subtract = (x?: number): SubtractAction => ({ type: ActionTypes.SUBTRACT, payload: x })
export const multiply = (x?: number): MultiplyAction => ({ type: ActionTypes.MULTIPLY, payload: x })
export const divide = (x?: number): DivideAction => ({ type: ActionTypes.DIVIDE, payload: x })
export const power = (x?: number): PowerAction => ({ type: ActionTypes.POWER, payload: x })

export const toggleSign = (x?: number): ToggleSignAction => ({ type: ActionTypes.TOGGLE_SIGN, payload: x })
export const sin = (x?: number): SinAction => ({ type: ActionTypes.SIN, payload: x })
export const cos = (x?: number): CosAction => ({ type: ActionTypes.COS, payload: x })
export const tan = (x?: number): TanAction => ({ type: ActionTypes.TAN, payload: x })
