import React from 'react'
import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

class App extends React.Component {
  maxID = 0

  constructor() {
    super()
    this.state = {
      currentView: 'all',
      items: [this.makeTask('Make react app', true), this.makeTask('buy snus'), this.makeTask('go to shop')],
    }
  }

  deleteTask = (deleteId) => {
    this.setState(({ items }) => ({ items: items.filter(({ id }) => id !== deleteId) }))
  }

  makeTask = (description, completed = false) => {
    return {
      id: this.maxID++,
      completed,
      description,
      createdTime: 0,
    }
  }

  getItems = () => {
    // Сомнительно, но окей

    const { currentView, items } = this.state
    switch (currentView) {
      case 'completed': {
        return items.filter(({ completed }) => completed)
      }
      case 'active': {
        return items.filter(({ completed }) => !completed)
      }
      default:
        return items
    }
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
    })
  }

  addTask = (description) => {
    this.setState(({ items }) => ({ items: [...items, this.makeTask(description)] }))
  }

  toggleCompeted = (id) => {
    this.setState(({ items }) => {
      return {
        items: items.map((el) => {
          if (el.id !== id) return el

          return {
            ...el,
            completed: !el.completed,
          }
        }),
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ items }) => ({
      items: items.filter(({ completed }) => !completed),
    }))
  }

  render() {
    const { items, currentView } = this.state
    const uncomletedCount = items.filter(({ completed }) => !completed).length

    return (
      <section className="todoapp">
        <NewTaskForm addTaskHandler={this.addTask} />
        <section className="main">
          <TaskList
            items={this.getItems()}
            deleteTaskHandler={this.deleteTask}
            toggleCompeletedHandler={this.toggleCompeted}
          />
          <Footer
            uncomletedCount={uncomletedCount}
            filterState={currentView}
            deleteCompletedHandler={this.deleteCompleted}
            changeFilterHandler={this.changeView}
          />
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

export default App
