import React from 'react'
import './AppHeader.css'

const AppHeader = ({ todoCount, doneCount }) => {
  return (
    <div className="app-header d-flex">
      <h1>My Todo list</h1>
      <h2>
        {todoCount} more to do, {doneCount} done
      </h2>
    </div>
  )
}

export default AppHeader
