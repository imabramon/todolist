import React from 'react'
import './TodoList.css'

import TodoItem from './TodoItem'


const TodoList = ({items})=>(
      <ul className='list-group todo-list'>
        {items.map(({id, ...item}) => <TodoItem key = {id} {...item}/>)}
      </ul>
    )
  

  export default TodoList