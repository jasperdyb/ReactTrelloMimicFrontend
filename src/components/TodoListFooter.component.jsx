import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListFooter({ handleMoveTodo }) {
  const [{ isOverOnBottom, item }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, 0, "bottom"),
    collect: (monitor) => ({
      isOverOnBottom: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
    canDrop: (todo) => todo.index !== 0,
  });

  return pug`
    div(ref=drop)
      if isOverOnBottom
        .card-body.px-2.pt-0.pb-2
          span.btn.d-flex.todo-blank(href="#" style={
            height:item.height
          })   

      .card-footer
        a.btn.btn-light(href="#") + Add todo
    `;
}

TodoListFooter.propTypes = {
  handleMoveTodo: PropTypes.func,
};
