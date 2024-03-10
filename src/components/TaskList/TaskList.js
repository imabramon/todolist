import React from 'react'
import './TaskList.css'

import Task from '../Task'

function TodoList({ items, deleteTaskHandler, toggleCompeletedHandler, updateTimeHandler }) {
  const tasks = items.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={item.id}
        onDeleted={() => {
          deleteTaskHandler(id)
        }}
        onToggleCompeleted={() => {
          toggleCompeletedHandler(id)
        }}
        onTimeUpdate={(newTime, isTimerRun) => {
          updateTimeHandler(id, newTime, isTimerRun)
        }}
        {...itemProps}
      />
    )
  })

  return <ul className="todo-list">{tasks}</ul>
}

export default TodoList
