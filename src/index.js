import React from 'react'
import  ReactDOM  from 'react-dom'
import './index.css'

import TodoList from './components/TodoList'
import AppHeader from './components/AppHeader'
import SearchInput from './components/SearchInput'
import StatusFilter from './components/StatusFilter'

const App = () =>
  {
    const items = [
      {
        label: 'Learn',
        important: true,
        id: 1,
      },
      {
        label: 'Run',
        id: 2,
      },
    ]

    return  (
        <div className="todo-app">
          <AppHeader/>
          <div className="top-panel d-flex">
            <SearchInput />
            <StatusFilter />
          </div>
          <TodoList items={items}/>
        </div>
      )
}
 
ReactDOM.render(<App />, document.getElementById('root')) 