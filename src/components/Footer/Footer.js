import React from 'react'
import './Footer.css'

import TasksFilter from '../TasksFilter'

function Footer(props) {
  const { changeFilterHandler, filterState, deleteCompletedHandler, uncomletedCount } = props
  return (
    <footer className="footer">
      <span className="todo-count">{uncomletedCount} items left</span>
      <TasksFilter filterState={filterState} changeFilterHandler={changeFilterHandler} />
      <button type="button" className="clear-completed" onClick={deleteCompletedHandler}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
