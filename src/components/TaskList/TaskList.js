import React from 'react'
import './TaskList.css'

import Task from '../Task/'


const TodoList = ({items})=>{
  const tasks = items.map((item)=>{
    const {id, ...itemProps} = item
    return (
      <Task key={id} {...itemProps}/>
    )
  })

  return (
    <ul className="todo-list">
      {tasks}
    </ul>
  )
}
  

  export default TodoList