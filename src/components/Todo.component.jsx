import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function Todo({ todo, index, handleMoveTodo }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.TODO, todo, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //clear default drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, index, "middle"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: (todo) => todo.index !== index,
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
        span.btn.d-flex.todo-blank.my-2(href="#") 
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleMoveTodo: PropTypes.func,
};
