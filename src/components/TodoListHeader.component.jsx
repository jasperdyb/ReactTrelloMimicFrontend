import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListHeader({ title, handleMoveTodo }) {
  const [{ isOverOnTop, item }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, 0, "top"),
    collect: (monitor) => ({
      isOverOnTop: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
    canDrop: (todo) => todo.index !== 0,
  });

  return pug`
    div(ref=drop)
      .card-header
        h5.card-title #{title}
      
      if isOverOnTop 
        .card-body.px-2.pt-2.pb-0
          span.btn.d-flex.todo-blank(href="#" style={
            height:item.height
          }) 
    `;
}

TodoListHeader.propTypes = {
  title: PropTypes.string,
  handleMoveTodo: PropTypes.func,
};
