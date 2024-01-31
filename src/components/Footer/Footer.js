import React from "react";
import './Footer.css'

import TasksFilter from "../TasksFilter";

const Footer = () => {
    return (
        <footer class="footer">
          <span class="todo-count">1 items left</span>
          <TasksFilter/>
          <button class="clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;