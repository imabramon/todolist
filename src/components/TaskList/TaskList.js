import React from 'react'
import './TaskList.css'

import Task from '../Task/'


const TodoList = ({items, deleteTaskHandler})=>{
  const tasks = items.map((item)=>{
    // const {id, ...itemProps} = item
    return (
      <Task key={item.id} {...item} deleteTaskHandler={deleteTaskHandler}/>
    )
  })

  return (
    <ul className="todo-list">
      {tasks}
    </ul>
  )
}
  

  export default TodoList