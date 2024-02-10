import React from "react";
import './TasksFilter.css'

class TasksFilter extends React.Component {

  state = {
    selectedButton: this.props.filterState
  }

  maxId = 0;

  onClick = (e)=>{
    const stateName = e.target.innerHTML.toLowerCase()
    // console.log(stateName)
    this.setState({selectedButton: stateName})
    const {changeFilterHandler} = this.props;
    changeFilterHandler(stateName)
  }

  makeButton = (name) =>({
    id: this.maxId++,
    name
  })

  render(){

    const buttonNames = [
      this.makeButton('All'),
      this.makeButton('Active'),
      this.makeButton('Completed')
    ]
    const buttons = buttonNames.map(({id, name})=>{
      const isSelected = name.toLowerCase() === this.state.selectedButton
      const className = isSelected ? 'selected' : '';
      return (
        <li key={id}>
          <button className={className}>{name}</button>
      </li>
      )
    })

      return (
          <ul className="filters" onClick={this.onClick}>
            {buttons}
          </ul>
      )
  }
}

export default TasksFilter;