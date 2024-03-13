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

const logger =
  (callback) =>
  (...args) => {
    console.log(`${callback} calls with args`, ...args)
    return callback(...args)
  }

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

const addTask = (items, description, min, sec) => [...items, makeTask(description, new Date(), min * 60 + sec)]

const toggleCompeted = (items, id) =>
  items.map((el) => {
    if (el.id !== id) return el

    return {
      ...el,
      completed: !el.completed,
    }
  })

const deleteCompleted = (items) => items.filter(({ completed }) => !completed)

const deleteTask = (items, deleteId) => items.filter(({ id }) => id !== deleteId)

const updateTaskTime = logger((items, id, newTime, isTimerRun) =>
  items.reduce((acc, curr) => {
    if (curr.id !== id) return [...acc, curr]
    const newObj = { ...curr, time: newTime, isTimerRun }

    if (isTimerRun) {
      newObj.timerPseudoStopDate = Date.now()
    }
    return [...acc, newObj]
  }, [])
)

const updateTaskTitle = (items, id, newTitle) => changeById(items, id, (item) => ({ ...item, description: newTitle }))

const TaskActionTypes = {
  delete: 'delete',
  toggleCompeted: 'toggleCompeted',
  updateTaskTime: 'updateTaskTime',
  updateTaskTitle: 'updateTaskTitle',
  add: 'add',
  deleteCompleted: 'deleteCompleted',
}

const TaskActions = {
  [TaskActionTypes.delete]: deleteTask,
  [TaskActionTypes.toggleCompeted]: toggleCompeted,
  [TaskActionTypes.updateTaskTime]: updateTaskTime,
  [TaskActionTypes.updateTaskTitle]: updateTaskTitle,
  [TaskActionTypes.add]: addTask,
  [TaskActionTypes.deleteCompleted]: deleteCompleted,
}

const taskReducer = (state, action) => {
  if (!action.type in TaskActions) return state

  return TaskActions[action.type](state, ...action.payload)
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

const tasksInitState = [
  makeTask('Make react app', new Date('2024-02-17T03:24:00'), 0, true),
  makeTask('buy snus', new Date('2024-02-17T03:24:00')),
  makeTask('go to shop', new Date('2024-02-17T03:24:00')),
]

const App = (props) => {
  const [tasks, tasksDispathcer] = useReducer(taskReducer, tasksInitState)

  const makeTaskDispathcer =
    (actionType) =>
    (...args) =>
      tasksDispathcer({ type: actionType, payload: [...args] })

  const addTask = makeTaskDispathcer(TaskActionTypes.add)
  const deleteTask = makeTaskDispathcer(TaskActionTypes.delete)
  const toggleCompeted = makeTaskDispathcer(TaskActionTypes.toggleCompeted)
  const updateTaskTime = makeTaskDispathcer(TaskActionTypes.updateTaskTime)
  const updateTaskTitle = makeTaskDispathcer(TaskActionTypes.updateTaskTitle)
  const deleteCompleted = makeTaskDispathcer(TaskActionTypes.deleteCompleted)

  const uncomletedCount = tasks.filter(({ completed }) => !completed).length

  const [currentView, changeView] = useState(ViewTypes.all)

  const renderTasks = ((items, currentView) => {
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
  })(tasks, currentView)

  return (
    <section className="todoapp">
      <NewTaskForm addTaskHandler={addTask} />
      <section className="main">
        <TaskList
          items={renderTasks}
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
