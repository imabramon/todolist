import React from 'react'
import './TasksFilter.css'

class TasksFilter extends React.Component {
  maxId = 0

  constructor(props) {
    super(props)
    const { filterState } = this.props
    this.state = {
      selectedButton: filterState,
    }
  }

  onClick = (e) => {
    const stateName = e.target.innerHTML.toLowerCase()
    // console.log(stateName)
    this.setState({ selectedButton: stateName })
    const { changeFilterHandler } = this.props
    changeFilterHandler(stateName)
  }

  makeButton = (name) => ({
    id: this.maxId++,
    name,
  })

  render() {
    const { selectedButton } = this.state

    const buttonNames = [this.makeButton('All'), this.makeButton('Active'), this.makeButton('Completed')]
    const buttons = buttonNames.map(({ id, name }) => {
      const isSelected = name.toLowerCase() === selectedButton
      const className = isSelected ? 'selected' : ''
      return (
        <li key={id}>
          <button type="button" className={className}>
            {name}
          </button>
        </li>
      )
    })

    return (
      <ul className="filters" onClick={this.onClick}>
        {buttons}
      </ul>
    )
  }
}

export default TasksFilter
