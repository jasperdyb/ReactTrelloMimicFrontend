import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListFooter({
  handleMoveTodo,
  setHideOnDrag,
  showNewTodo,
  handleAddNewTodo,
}) {
  const [{ isOverOnBottom, item }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, -1, "bottom"),
    collect: (monitor) => ({
      isOverOnBottom: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
    // canDrop: (todo) => todo.index !== 0,
  });

  useLayoutEffect(() => {
    if (isOverOnBottom) {
      setHideOnDrag(isOverOnBottom);
    }
  }, [setHideOnDrag, isOverOnBottom]);

  return pug`
    div(ref=drop)
      if isOverOnBottom
        .card-body.p-2
          span.btn.d-flex.todo-blank( style={
            height:item.height
          })   

      .card-footer
        if !showNewTodo
          button.btn.btn-light(onClick=handleAddNewTodo) + Add todo
          
        else
          button.btn.btn-success() New todo
    `;
}

TodoListFooter.propTypes = {
  handleMoveTodo: PropTypes.func,
  setHideOnDrag: PropTypes.func,
  showNewTodo: PropTypes.bool,
  handleAddNewTodo: PropTypes.func,
};
