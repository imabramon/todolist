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

const toggleTaskCompeted = (items, id) =>
  items.map((el) => {
    if (el.id !== id) return el

    return {
      ...el,
      completed: !el.completed,
    }
  })

const deleteCompletedTasks = (items) => items.filter(({ completed }) => !completed)

const deleteTask = (items, deleteId) => items.filter(({ id }) => id !== deleteId)

const updateTaskTime = (items, id, newTime, isTimerRun) =>
  items.reduce((acc, curr) => {
    if (curr.id !== id) return [...acc, curr]
    const newObj = { ...curr, time: newTime, isTimerRun }

    if (isTimerRun) {
      newObj.timerPseudoStopDate = Date.now()
    }
    return [...acc, newObj]
  }, [])

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
  [TaskActionTypes.toggleCompeted]: toggleTaskCompeted,
  [TaskActionTypes.updateTaskTime]: updateTaskTime,
  [TaskActionTypes.updateTaskTitle]: updateTaskTitle,
  [TaskActionTypes.add]: addTask,
  [TaskActionTypes.deleteCompleted]: deleteCompletedTasks,
}

const taskReducer = (state, action) => {
  if (!(action.type in TaskActions)) return state

  return TaskActions[action.type](state, ...action.payload)
}

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

function App() {
  const [tasks, tasksDispathcer] = useReducer(taskReducer, tasksInitState)
  const makeTaskDispathcer =
    (actionType) =>
    (...args) =>
      tasksDispathcer({ type: actionType, payload: [...args] })

  const add = makeTaskDispathcer(TaskActionTypes.add)
  const del = makeTaskDispathcer(TaskActionTypes.delete)
  const toggle = makeTaskDispathcer(TaskActionTypes.toggleCompeted)
  const updateTime = makeTaskDispathcer(TaskActionTypes.updateTaskTime)
  const updateTitle = makeTaskDispathcer(TaskActionTypes.updateTaskTitle)
  const deleteCompleted = makeTaskDispathcer(TaskActionTypes.deleteCompleted)

  const uncomletedCount = tasks.filter(({ completed }) => !completed).length

  const [currentView, changeView] = useState(ViewTypes.all)

  const renderTasks = ((items, view) => {
    switch (view) {
      case ViewTypes.completed: {
        return items.filter(({ completed }) => completed)
      }
      case ViewTypes.active: {
        return items.filter(({ completed }) => !completed)
      }
      default:
        return items
    }
  })(tasks, currentView)

  return (
    <section className="todoapp">
      <NewTaskForm addTaskHandler={add} />
      <section className="main">
        <TaskList
          items={renderTasks}
          deleteTaskHandler={del}
          toggleCompeletedHandler={toggle}
          updateTimeHandler={updateTime}
          updateTaskTitleHandler={updateTitle}
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
