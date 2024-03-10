/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
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
    time: this.props.time,
  }

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
    const { onTimeUpdate } = this.props
    const { time: newTime } = this.state
    const { isTimerRun } = this
    this.timerStop()
    onTimeUpdate(newTime, isTimerRun)
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

  render() {
    const { description, createdTime, completed, onToggleCompeleted, onDeleted } = this.props
    const competedClass = completed ? 'completed' : ''
    const { time } = this.state
    const itemClassNames = [competedClass].filter((el) => el).join(' ')

    return (
      <li className={itemClassNames}>
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
          <button type="button" className="icon icon-edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}

export default Task
