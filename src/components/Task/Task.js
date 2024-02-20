import React from 'react'
import './Task.css'

class Task extends React.Component {
  render() {
    const { description, createdTime, completed, onToggleCompeleted, onDeleted } = this.props
    // const taskInput = this.state.editing ? <input type="text" className="edit" value={description}/> : null;
    const competedClass = completed ? 'completed' : ''
    const itemClassNames = [competedClass].filter((el) => el).join(' ')

    return (
      <li className={itemClassNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onClick={onToggleCompeleted} />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {createdTime} seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {/* {taskInput} */}
      </li>
    )
  }
}

export default Task
