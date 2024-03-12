import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

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

class Task extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    time: this.props.time,
    isEditing: false,
    // eslint-disable-next-line react/destructuring-assignment
    title: this.props.description,
  }

  // eslint-disable-next-line react/destructuring-assignment
  isTimerRun = this.props.isTimerRun

  componentDidMount() {
    const { isTimerRun, timerPseudoStopDate } = this.props
    const { time } = this.state

    if (isTimerRun) {
      const timeAfterPseudoStop = Math.floor((Date.now() - timerPseudoStopDate) / 1000)

      this.setState({ time: time + timeAfterPseudoStop })
      this.timerStart()
    }
  }

  componentWillUnmount() {
    const { onTimeUpdate, onTaskTitleUpdate } = this.props
    const { time: newTime, title } = this.state
    const { isTimerRun } = this
    this.timerStop()
    onTimeUpdate(newTime, isTimerRun)
    onTaskTitleUpdate(title)
  }

  makeTick = () => {
    this.setState(({ time }) => ({ time: time + 1 }))
  }

  timerStart = () => {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.makeTick, 1000)
      this.isTimerRun = true
    }
  }

  timerStop = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      this.isTimerRun = false
    }
  }

  onToggleEditingMode = (e) => {
    e.preventDefault()
    const { isEditing, title } = this.state

    if (isEditing) {
      const { onTaskTitleUpdate } = this.props
      onTaskTitleUpdate(title)
      this.setState({
        isEditing: false,
      })
      return
    }

    this.setState({ isEditing: true })
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  render() {
    const { description, createdTime, completed, onToggleCompeleted, onDeleted } = this.props
    const { isEditing, title } = this.state
    const competedClass = completed ? 'completed' : ''
    const editingClass = isEditing ? 'editing' : ''
    const { time } = this.state
    const itemClassNames = [competedClass, editingClass].filter((el) => el).join(' ')

    const EditingTaskInput = isEditing ? (
      <form onSubmit={this.onToggleEditingMode}>
        <input
          type="text"
          className="edit"
          value={title}
          onChange={this.onTitleChange}
          onBlur={this.onToggleEditingMode}
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
            <button type="button" className="icon icon-play" onClick={this.timerStart} />
            <button type="button" className="icon icon-pause" onClick={this.timerStop} />
            {formatSeconds(time)}
          </span>
          <span className="created">{`${formatDistanceToNow(createdTime)} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={this.onToggleEditingMode} />
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
}

export default Task
