import React from "react";
import './Footer.css'

import TasksFilter from "../TasksFilter";

const Footer = (props) => {
    const {changeFilterHandler, filterState} = props
    return (
        <footer class="footer">
          <span class="todo-count">1 items left</span>
          <TasksFilter
            filterState={filterState}
            changeFilterHandler={changeFilterHandler}/>
          <button class="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;