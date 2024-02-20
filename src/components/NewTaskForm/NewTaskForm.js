import React from 'react'
import './NewTaskForm.css'

class NewTaskForm extends React.Component {
  state = {
    currentInput: '',
  }

  onChange = (e) => {
    this.setState({
      currentInput: e.target.value,
    })
    console.log('on change')
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { addTaskHandler } = this.props
    addTaskHandler(this.state.currentInput)
    this.setState({
      currentInput: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.currentInput}
            onChange={this.onChange}
            autoFocus
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
