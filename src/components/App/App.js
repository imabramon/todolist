import React from 'react'
import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

const changeById = (arr, id, callback) => {
  return arr.reduce((acc, curr) => {
    if (curr.id !== id) return [...acc, curr]
    return [...acc, callback(curr)]
  }, [])
}

class App extends React.Component {
  maxID = 0

  constructor() {
    super()
    this.state = {
      currentView: 'all',
      items: [
        this.makeTask('Make react app', new Date('2024-02-17T03:24:00'), 0, true),
        this.makeTask('buy snus', new Date('2024-02-17T03:24:00')),
        this.makeTask('go to shop', new Date('2024-02-17T03:24:00')),
      ],
    }
  }

  deleteTask = (deleteId) => {
    this.setState(({ items }) => ({ items: items.filter(({ id }) => id !== deleteId) }))
  }

  updateTaskTime = (id, newTime, isTimerRun) => {
    this.setState(({ items }) => ({
      items: items.reduce((acc, curr) => {
        if (curr.id !== id) return [...acc, curr]
        const newObj = { ...curr, time: newTime, isTimerRun }

        if (isTimerRun) {
          newObj.timerPseudoStopDate = Date.now()
        }
        return [...acc, newObj]
      }, []),
    }))
  }

  updateTaskTitle = (id, newTitle) => {
    this.setState(({ items }) => ({
      items: changeById(items, id, (item) => ({ ...item, description: newTitle })),
    }))
  }

  makeTask = (description, createdTime, time = 0, completed = false) => {
    return {
      id: this.maxID++,
      completed,
      description,
      createdTime,
      time,
      isTimerRun: false,
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

  addTask = (description, min, sec) => {
    this.setState(({ items }) => ({
      items: [...items, this.makeTask(description, new Date(), min * 60 + sec)],
    }))
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
            updateTimeHandler={this.updateTaskTime}
            updateTaskTitleHandler={this.updateTaskTitle}
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
