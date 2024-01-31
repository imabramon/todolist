import React from "react";
import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";

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
        <section className="todoapp">
            <NewTaskForm/>
            <section className="main">
                <TaskList items={items}/>
                <Footer/>
            </section>
        </section>
      )
}

export default App;