import React from 'react'
import './Task.css'

function Task(props) {
  const { description, createdTime, completed, onToggleCompeleted, onDeleted } = props
  const competedClass = completed ? 'completed' : ''
  const itemClassNames = [competedClass].filter((el) => el).join(' ')
  return (
    <li className={itemClassNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompeleted} />
        <label>
          <span className="description">{description}</span>
          <span className="created">created {createdTime} seconds ago</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  )
}

export default Task
