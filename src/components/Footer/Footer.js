import React from 'react'
import './Footer.css'

import TasksFilter from '../TasksFilter'

const Footer = (props) => {
  const { changeFilterHandler, filterState, deleteCompletedHandler, uncomletedCount } = props
  return (
    <footer className="footer">
      <span className="todo-count">{uncomletedCount} items left</span>
      <TasksFilter filterState={filterState} changeFilterHandler={changeFilterHandler} />
      <button className="clear-completed" onClick={deleteCompletedHandler}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
