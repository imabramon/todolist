import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import useInput from '../../hooks/useInput'
import useComponentWillUnmount from '../../hooks/useComponentWillUnmount'

const onKeyPress = (key, callback) => (e) => {
  if (e.key === key) {
    callback(e)
  }
}

const formatSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60)
  const secondsNoOverflow = seconds % 60
  if (hours) {
    const minutesNoOverflow = minutes % 60
    return `${hours}:${minutesNoOverflow}:${secondsNoOverflow}`
  }

  if (minutes) {
    return `${minutes}:${secondsNoOverflow}`
  }

  return `${seconds}`
}

function Task(props) {
  const {
    description,
    createdTime,
    completed,
    onToggleCompeleted,
    onDeleted,
    isTimerRun,
    onTaskTitleUpdate,
    onTimeUpdate,
    time: propsTime,
  } = props

  const [isEditing, setEditing] = useState(false)
  const [title, setTitle] = useInput(description)
  const [time, setTime] = useState(propsTime)
  const [isRun, setRun] = useState(isTimerRun)

  const timerStart = () => {
    if (time === 0) return
    if (!isRun) setRun(true)
  }

  const timerStop = () => {
    if (isRun) setRun(false)
  }

  const makeTick = () => {
    if (time === 0) {
      timerStop()
      return
    }
    setTime((value) => value - 1)
  }

  const onToggleEditingMode = (e) => {
    e.preventDefault()

    if (isEditing) {
      onTaskTitleUpdate(title)
      setEditing(false)
      return
    }

    setEditing(true)
  }

  useEffect(() => {
    if (isRun) {
      const id = setInterval(makeTick, 1000)
      return () => {
        clearInterval(id)
      }
    }

    return () => {}
  })

  useComponentWillUnmount(() => {
    onTaskTitleUpdate(title)
    onTimeUpdate(time, isRun)
  })

  useEffect(() => {
    if (isTimerRun) {
      timerStart()
    }
  }, [])

  const exitEditingMode = () => {
    const { description: prevDescription } = props
    setEditing(false)
    setTitle({ target: { value: prevDescription } })
  }

  const competedClass = completed ? 'completed' : ''
  const editingClass = isEditing ? 'editing' : ''
  const itemClassNames = [competedClass, editingClass].filter((el) => el).join(' ')

  const EditingTaskInput = isEditing ? (
    <form onSubmit={onToggleEditingMode}>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={setTitle}
        onKeyDown={onKeyPress('Escape', exitEditingMode)}
        onBlur={exitEditingMode}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </form>
  ) : null

  const StaticTask = !isEditing ? (
    <div className="view">
      <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompeleted} />
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button type="button" className="icon icon-play" onClick={timerStart} />
          <button type="button" className="icon icon-pause" onClick={timerStop} />
          {formatSeconds(time)}
        </span>
        <span className="created">{`${formatDistanceToNow(createdTime)} ago`}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onToggleEditingMode} />
      <button type="button" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  ) : null

  return (
    <li className={itemClassNames}>
      {StaticTask}
      {EditingTaskInput}
    </li>
  )
}

export default Task
