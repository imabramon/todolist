import React from 'react'
import './TasksFilter.css'

let maxId = 0

const makeButton = (name) => ({
  id: maxId++,
  name,
})

const buttonNames = [makeButton('All'), makeButton('Active'), makeButton('Completed')]

function TasksFilter(props) {
  const { filterState, changeFilterHandler } = props

  const onClick = (e) => {
    if (e.target.tagName === 'UL') return
    const stateName = e.target.innerHTML.toLowerCase()
    changeFilterHandler(stateName)
  }

  const buttons = buttonNames.map(({ id, name }) => {
    const isSelected = name.toLowerCase() === filterState
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
    <ul className="filters" onClick={onClick}>
      {buttons}
    </ul>
  )
}

export default TasksFilter
