import type { NextPage } from 'next'
import { useState, useContext } from 'react'
import { AppContext } from '../global-state/app-context'
import { add, clear, cos, divide, drop, enter, multiply, power, sin, subtract, swap, tan, toggleSign } from '../global-state/calculator/actions'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [inputValue, setInputValue] = useState('')

  const { state: { calculator: { stack } }, dispatch } = useContext(AppContext)

  const handleInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e is an instance of SyntheticEvent <-- see note in README.md
    const value = e.currentTarget.value // we need to store this in a variable because of event pooling
    setInputValue(prev => {
      if (value === '.' && prev.includes('.')) return prev // we use the variable in the async setter (not the event, because its properties are already nullified)
      return prev + value
    })
  }

  const handleEnter = () => {
    (inputValue && inputValue !== '.') ?
      dispatch(enter(Number.parseFloat(inputValue))) :
      (stack.length && inputValue !== '.') && dispatch(enter(stack[stack.length - 1]))
    setInputValue('')
  }

  const handleClear = () => inputValue ? setInputValue('') : dispatch(clear())
  const handleDrop = () => inputValue ? setInputValue('') : dispatch(drop())
  const handleSwap = () => inputValue ? setInputValue('') : dispatch(swap())

  const handleBinaryOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const operation = e.currentTarget.value
    let x: number | undefined
    if (inputValue) {
      if (!stack.length || inputValue === '.') return setInputValue('')
      x = Number.parseFloat(inputValue)
      setInputValue('')
    } else {
      if (stack.length < 2) return
    }
    switch (operation) {
      case '+':
        dispatch(add(x))
        break
      case '-':
        dispatch(subtract(x))
        break
      case '*':
        dispatch(multiply(x))
        break
      case '/':
        dispatch(divide(x))
        break
      case 'pow':
        dispatch(power(x))
        break
    }
  }

  const handleUnaryOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const operation = e.currentTarget.value
    let x: number | undefined
    if (inputValue) {
      if (inputValue === '.') return setInputValue('')
      x = Number.parseFloat(inputValue)
      setInputValue('')
    } else {
      if (!stack.length) return
    }
    switch (operation) {
      case 'toggleSign':
        dispatch(toggleSign(x))
        break
      case 'sin':
        dispatch(sin(x))
        break
      case 'cos':
        dispatch(cos(x))
        break
      case 'tan':
        dispatch(tan(x))
        break
    }
  }

  return (
    <div className={styles.container}>

      <div className={styles.stack}>
        <input readOnly value={inputValue ? (stack[stack.length - 3] ?? '') : (stack[stack.length - 4] ?? '')} className={styles.stackItem} />
        <input readOnly value={inputValue ? (stack[stack.length - 2] ?? '') : (stack[stack.length - 3] ?? '')} className={styles.stackItem} />
        <input readOnly value={inputValue ? (stack[stack.length - 1] ?? '') : (stack[stack.length - 2] ?? '')} className={styles.stackItem} />
        <input readOnly value={inputValue ? inputValue : (stack[stack.length - 1] ?? '')} className={`${styles.stackItem} ${inputValue ? styles.input : ''}`} />
      </div>

      <div className={styles.grid}>
        <button onClick={handleEnter} className={styles.enterButton}>Enter</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleDrop}>Drop</button>
        <button onClick={handleSwap}>Swap</button>
        <button onClick={handleInput} value="7">7</button>
        <button onClick={handleInput} value="8">8</button>
        <button onClick={handleInput} value="9">9</button>
        <button onClick={handleBinaryOperation} value="/">/</button>
        <button onClick={handleBinaryOperation} value="pow">pow</button>
        <button onClick={handleInput} value="4">4</button>
        <button onClick={handleInput} value="5">5</button>
        <button onClick={handleInput} value="6">6</button>
        <button onClick={handleBinaryOperation} value="*">x</button>
        <button onClick={handleUnaryOperation} value="sin">sin</button>
        <button onClick={handleInput} value="1">1</button>
        <button onClick={handleInput} value="2">2</button>
        <button onClick={handleInput} value="3">3</button>
        <button onClick={handleBinaryOperation} value="-">-</button>
        <button onClick={handleUnaryOperation} value="cos">cos</button>
        <button onClick={handleInput} value="0">0</button>
        <button onClick={handleInput} value=".">.</button>
        <button onClick={handleUnaryOperation} value="toggleSign">+/-</button>
        <button onClick={handleBinaryOperation} value="+">+</button>
        <button onClick={handleUnaryOperation} value="tan">tan</button>
      </div>

        {/* <pre>{JSON.stringify({ stack, inputValue })}</pre> */}

    </div>
  )
}

export default Home
