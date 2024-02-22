import React from 'react'
import './NewTaskForm.css'

class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      currentInput: '',
    }
  }

  onChange = (e) => {
    this.setState({
      currentInput: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { currentInput } = this.state
    e.preventDefault()
    const { addTaskHandler } = this.props
    addTaskHandler(currentInput)
    this.setState({
      currentInput: '',
    })
  }

  render() {
    const { currentInput } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={currentInput}
            onChange={this.onChange}
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
