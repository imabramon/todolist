import React from "react";
import './Task.css'

// const TodoItem = ({label, important = false}) => {
//     const style = {
//         color: important ? "red" : 'inherit', 
//         fontWeight: important ? 'bold' : 'normal'
//     }

//     // Перенести в цсс
//     const buttonStyle = {
//         float: "right"
//     }

//     return ( 
//         <li className="list-group-item">
//             <span className="todo-list-item">
//                 <span
//                     className="todo-list-item-label"
//                     style={style}>
//                     {label}
//                 </span>

//                 <button type="button" style={buttonStyle}
//                         className="btn btn-outline-success btn-sm">
//                     <i className="fa fa-exclamation" />
//                 </button>

//                 <button type="button"
//                         className="btn btn-outline-danger btn-sm"
//                         style={buttonStyle}>
//                     <i className="fa fa-trash-o" />
//                 </button>
//             </span>
//         </li>)
// }

const Task = ({description, createdTime, taskType}) =>{
    return (
        <li className={taskType}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{description}</span>
                <span className="created">created {createdTime} seconds ago</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
          </li>
    )
}


export default Task;