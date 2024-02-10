import React from 'react'
import './TaskList.css'

import Task from '../Task/'


const TodoList = ({items, deleteTaskHandler, toggleCompeletedHandler})=>{
  const tasks = items.map((item)=>{
    const {id, ...itemProps} = item
    return (
      <Task 
        key={item.id} 
        onDeleted={()=>{deleteTaskHandler(id)}} 
        onToggleCompeleted={()=>{toggleCompeletedHandler(id)}}
        {...itemProps} 
      />
    )
  })

  return (
    <ul className="todo-list">
      {tasks}
    </ul>
  )
}
  

  export default TodoList