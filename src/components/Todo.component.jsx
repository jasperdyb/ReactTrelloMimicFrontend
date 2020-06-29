import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrag, useDrop } from "react-dnd";

export default function Todo({ todo, index, handleMoveTodo }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TODO, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return pug`
    div(ref=drag
      style={
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      })
      div(ref=drop
      style={
        position: 'relative',
        width: '100%',
        height: '100%',
      })
        a.btn.d-flex.todo-item(href="#") #{todo.name}
        
      if isOver 
        a.btn.d-flex.todo-item(href="#") #{todo.name}
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleMoveTodo: PropTypes.func,
};
