import React from 'react'
import './NewTaskForm.css'

const defaultState = {
  currentInput: '',
  currentMin: '',
  currentSec: '',
}

const preventNotNumber = (callback) => (e) => {
  if (e.nativeEvent.data) {
    if (!/[0-9]/.test(e.nativeEvent.data)) {
      e.preventDefault()
      return
    }
  }
  callback(e)
}

class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = { ...defaultState }
  }

  onInputChange = (e) => {
    this.setStateByValue('currentInput', e)
  }

  onMinChange = preventNotNumber((e) => {
    this.setStateByValue('currentMin', e)
  })

  onSecChange = preventNotNumber((e) => {
    this.setStateByValue('currentSec', e)
  })

  setStateByValue = (name, e) => {
    this.setState({
      [name]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { currentInput } = this.state

    if (currentInput.trim().length === 0) {
      return
    }

    let { currentMin, currentSec } = this.state

    if (currentMin === '') {
      currentMin = 0
    } else {
      currentMin = Number(currentMin)
    }
    if (currentSec === '') {
      currentSec = 0
    } else {
      currentSec = Number(currentSec)
    }

    const { addTaskHandler } = this.props
    addTaskHandler(currentInput, currentMin, currentSec)
    this.setState({ ...defaultState })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e)
    }
  }

  render() {
    const { currentInput, currentMin, currentSec } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={this.onSubmit}
          className="new-todo-form"
          name="todo-form"
          onKeyDown={this.onKeyDown} //
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={currentInput}
            onChange={this.onInputChange}
            form="todo-form"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={currentMin}
            onChange={this.onMinChange}
            form="todo-form"
            maxLength={2}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={currentSec}
            onChange={this.onSecChange}
            form="todo-form"
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
