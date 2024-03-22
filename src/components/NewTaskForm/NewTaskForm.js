import React from 'react'

import './NewTaskForm.css'
import useInput from '../../hooks/useInput'

const preventNotNumber = (callback) => (e) => {
  if (e.nativeEvent.data) {
    if (!/[0-9]/.test(e.nativeEvent.data)) {
      e.preventDefault()
      return
    }
  }
  callback(e)
}

function NewTaskForm({ addTaskHandler }) {
  const [input, setInput, clearInput] = useInput('')
  const [min, setMinText, clearMin] = useInput('')
  const [sec, setSecText, clearSec] = useInput('')

  const setMin = preventNotNumber(setMinText)
  const setSec = preventNotNumber(setSecText)

  const clearAll = () => {
    clearInput()
    clearMin()
    clearSec()
  }

  const emitTask = () => {
    if (input.length === 0) return
    addTaskHandler(input, Number(min), Number(sec))
    clearAll()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    emitTask()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      emitTask()
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={onSubmit}
        className="new-todo-form"
        name="todo-form"
        onKeyDown={onKeyDown} //
      >
        <input className="new-todo" placeholder="What I've Done?" value={input} onChange={setInput} form="todo-form" />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={setMin}
          form="todo-form"
          maxLength={2}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={setSec}
          form="todo-form"
          maxLength={2}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
