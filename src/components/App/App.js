import React from "react";
import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      items: [
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
    }
  }

  deleteTask = (deleteId) =>{

    this.setState(
      ({items})=>({items: items.filter(({id})=>id !== deleteId)})
    )
  }

  render(){
    return  (
      <section className="todoapp">
          <NewTaskForm/>
          <section className="main">
              <TaskList items={this.state.items} deleteTaskHandler={this.deleteTask}/>
              <Footer/>
          </section>
      </section>
    )
  }
}

// const App = () =>
//   {
//     const items = [
//       {
//         id: 1, 
//         taskType: 'completed',
//         description: 'Completed task',
//         createdTime: "17",
//       },
//       {
//         id: 2, 
//         taskType: 'editing',
//         description: 'Editing task',
//         createdTime: "5",
//       },
//       {
//         id: 3, 
//         taskType: '',
//         description: 'Active task',
//         createdTime: "17",
//       },
//     ]

    
// }

export default App;