/* eslint-disable */
import React, { useReducer, useState } from 'react'
import './App.css'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

const changeById = (arr, id, callback) =>
  arr.reduce((acc, curr) => {
    if (curr.id !== id) return [...acc, curr]
    return [...acc, callback(curr)]
  }, [])

class App1 extends React.Component {
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

  makeTask = (description, createdTime, time = 0, completed = false) => ({
    id: this.maxID++,
    completed,
    description,
    createdTime,
    time,
    isTimerRun: false,
  })

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
    this.setState(({ items }) => ({
      items: items.map((el) => {
        if (el.id !== id) return el

        return {
          ...el,
          completed: !el.completed,
        }
      }),
    }))
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

let maxID = 0 // мб сделать через замыкание

const makeTask = (description, createdTime, time = 0, completed = false) => ({
  id: maxID++,
  completed,
  description,
  createdTime,
  time,
  isTimerRun: false,
})

const TaskActionTypes = {
  delete: 'delete',
  toggleCompeted: 'toggleCompeted',
  updateTaskTime: 'updateTaskTime',
  updateTaskTitle: 'updateTaskTitle',
  add: 'add',
}

const addTask = (description, min, sec) => {
  this.setState(({ items }) => ({
    items: [...items, this.makeTask(description, new Date(), min * 60 + sec)],
  }))
}

const toggleCompeted = (id) => {
  this.setState(({ items }) => ({
    items: items.map((el) => {
      if (el.id !== id) return el

      return {
        ...el,
        completed: !el.completed,
      }
    }),
  }))
}

const deleteCompleted = () => {
  this.setState(({ items }) => ({
    items: items.filter(({ completed }) => !completed),
  }))
}

const taskReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

/* 
  deleteTaskHandler = id
  toggleCompeletedHandler = id
  updateTimeHandler = id newTime isTimerRun
  updateTaskTitleHandler = id new Title
  addTask = title min sec
*/

const ViewTypes = {
  all: 'all',
  completed: 'completed',
  active: 'active',
}

const App = (props) => {
  const [tasks, tasksDispathcer] = useReducer(taskReducer, [
    makeTask('Make react app', new Date('2024-02-17T03:24:00'), 0, true),
    makeTask('buy snus', new Date('2024-02-17T03:24:00')),
    makeTask('go to shop', new Date('2024-02-17T03:24:00')),
  ])

  const addTask = (title, min, sec) => {
    console.log(`add task with ${title} and time ${min}:${sec}`)
  }

  const deleteTask = (id) => {
    console.log('delete task', id)
  }

  const toggleCompeted = (id) => {
    console.log('toggle task', id)
  }

  const updateTaskTime = (id, newTime, isTimerRun) => {
    console.log(`update task[${id} to new time ${newTime}. Timer is running: ${isTimerRun}`)
  }

  const updateTaskTitle = (id, newTitle) => {
    console.log(`update task[${id} to new title ${newTitle}`)
  }

  const uncomletedCount = (() => 2)(tasks)

  const deleteCompleted = () => {
    console.log(`delete all completed`)
  }

  const [currentView, setCurrentView] = useState(ViewTypes.all)

  const changeView = (newView) => {
    console.log(`new view is ${newView}`)
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTaskHandler={addTask} />
      <section className="main">
        <TaskList
          items={tasks}
          deleteTaskHandler={deleteTask}
          toggleCompeletedHandler={toggleCompeted}
          updateTimeHandler={updateTaskTime}
          updateTaskTitleHandler={updateTaskTitle}
        />
        <Footer
          uncomletedCount={uncomletedCount}
          filterState={currentView}
          deleteCompletedHandler={deleteCompleted}
          changeFilterHandler={changeView}
        />
      </section>
    </section>
  )
}

export default App
