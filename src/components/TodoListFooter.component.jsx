import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListFooter({ handleMoveTodo, hideOnDrag }) {
  const [{ isOverOnBottom, item }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, 0, "bottom"),
    collect: (monitor) => ({
      isOverOnBottom: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
    canDrop: (todo) => todo.index !== 0,
  });

  // eslint-disable-next-line
  const [hide, setHide] = useState(hideOnDrag);

  useLayoutEffect(() => {
    if (isOverOnBottom) {
      setHide(isOverOnBottom);
    }
  }, [hideOnDrag, isOverOnBottom]);

  return pug`
    div(ref=drop)
      if isOverOnBottom
        .card-body.p-2
          span.btn.d-flex.todo-blank(href="#" style={
            height:item.height
          })   

      .card-footer
        a.btn.btn-light(href="#") + Add todo
    `;
}

TodoListFooter.propTypes = {
  handleMoveTodo: PropTypes.func,
  hideOnDrag: PropTypes.bool,
};
