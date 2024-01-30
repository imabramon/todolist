import React from "react";
import './TodoItem.css'

const TodoItem = ({label, important = false}) => {
    const style = {
        color: important ? "red" : 'inherit', 
        fontWeight: important ? 'bold' : 'normal'
    }

    // Перенести в цсс
    const buttonStyle = {
        float: "right"
    }

    return ( 
        <li className="list-group-item">
            <span className="todo-list-item">
                <span
                    className="todo-list-item-label"
                    style={style}>
                    {label}
                </span>

                <button type="button" style={buttonStyle}
                        className="btn btn-outline-success btn-sm">
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm"
                        style={buttonStyle}>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        </li>)
}

export default TodoItem;