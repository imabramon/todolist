import React from "react";
import './Task.css'


class Task extends React.Component{
  constructor(props){
    super()

    const {taskType, deleteTaskHandler, id} = props;
    // console.log(deleteTaskHandler)

    this.state = {
      taskType
    }

    this.deleteTask = function(){
      deleteTaskHandler(id)
      console.log('deleteTask call')
    }
  }

  toggleComplete = ()=>{
    this.setState(({taskType})=>{
      if( taskType === '') return {taskType: 'completed'}
      
      return {taskType: ''}
    })
  }

  render(){
    const {description, createdTime} = this.props
    const taskInput = this.state.taskType === 'editing' ? <input type="text" className="edit" value={description}/> : null;
    const checked = this.state.taskType === 'completed'

    return (
        <li className={this.state.taskType}>
            <div className="view">
              <input className="toggle" type="checkbox" checked={checked} onClick={this.toggleComplete}/>
              <label>
                <span className="description">{description}</span>
                <span className="created">created {createdTime} seconds ago</span>
              </label>
              <button className="icon icon-edit" ></button>
              <button className="icon icon-destroy" onClick={this.deleteTask}></button>
            </div>
            {taskInput}
          </li>
    )
  }
}




export default Task;