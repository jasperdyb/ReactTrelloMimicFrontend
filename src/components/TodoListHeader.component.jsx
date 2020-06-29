import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListHeader({ title, handleMoveTodo }) {
  const [{ isOverOnTop }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, 0, "top"),
    collect: (monitor) => ({
      isOverOnTop: !!monitor.isOver(),
    }),
    canDrop: (todo) => todo.index !== 0,
  });

  return pug`
    div(ref=drop)
      .card-header
        h5.card-title #{title}
      
      if isOverOnTop 
        span.btn.d-flex.todo-blank(href="#") 
    `;
}

TodoListHeader.propTypes = {
  title: PropTypes.string,
  handleMoveTodo: PropTypes.func,
};
