import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListFooter({ handleMoveTodo }) {
  const [{ isOverOnBottom }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, 0, "bottom"),
    collect: (monitor) => ({
      isOverOnBottom: !!monitor.isOver(),
    }),
    canDrop: (todo) => todo.index !== 0,
  });

  return pug`
    div(ref=drop)
      if isOverOnBottom 
        span.btn.d-flex.todo-blank(href="#")   

      .card-footer
        a.btn.btn-light(href="#") + Add todo
    `;
}

TodoListFooter.propTypes = {
  handleMoveTodo: PropTypes.func,
};
