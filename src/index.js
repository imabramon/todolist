import React from 'react'
import  ReactDOM  from 'react-dom'
import './index.css'

import TaskList from './components/TaskList'

const App = () =>
  {
    const items = [
      {
        id: 1, 
        taskType: 'completed',
        description: 'Completed task',
        createdTime: "17",
      },
      {
        id: 2, 
        taskType: 'editing',
        description: 'Editing task',
        createdTime: "5",
      },
      {
        id: 3, 
        taskType: '',
        description: 'Active task',
        createdTime: "17",
      },
    ]

    return  (
        <div className="todo-app">
          <TaskList items={items}/>
        </div>
      )
}
 
ReactDOM.render(<App />, document.getElementById('root')) 