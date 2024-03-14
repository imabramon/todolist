import React from 'react'

import './NewTaskForm.css'
import useInput from '../../hooks/useInput'

// const useInput = (value) => {
//   const [state, setState] = useState(value)
//   const onChange = (e) => {
//     setState(e.target.value)
//   }
//   const clear = () => {
//     setState(value)
//   }
//   return [state, onChange, clear]
// }

function NewTaskForm({ addTaskHandler }) {
  const [input, setInput, clearInput] = useInput('')
  const [min, setMin, clearMin] = useInput('')
  const [sec, setSec, clearSec] = useInput('')

  const clearAll = () => {
    clearInput()
    clearMin()
    clearSec()
  }

  const emitTask = () => {
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
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={setMin} form="todo-form" />
        <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={setSec} form="todo-form" />
      </form>
    </header>
  )
}

export default NewTaskForm
