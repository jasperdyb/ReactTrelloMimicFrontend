import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoListFooter({
  listLength,
  handleMoveTodo,
  setHideOnDrag,
  showNewTodo,
  handleShowNewTodo,
  handlePreventNewTodoOnBlur,
  handleAddNewTodo,
}) {
  const [{ isOverOnBottom, item, canDrop }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, -1, "bottom"),
    collect: (monitor) => ({
      isOverOnBottom: !!monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
    hover: () => {
      setHideOnDrag(canDrop);
    },
    canDrop: (todo) => todo.index !== listLength - 1,
  });

  return pug`
    div(ref=drop)
      if isOverOnBottom  && canDrop
        .card-body.p-2
          span.btn.d-flex.todo-blank( style={
            height:item.height
          })   

      .card-footer
        if !showNewTodo
          button.btn.btn-light(onClick=handleShowNewTodo) + Add todo

        else
          button.btn.btn-success(
            onMouseDown=handlePreventNewTodoOnBlur 
            onClick=handleAddNewTodo
            ) New todo
    `;
}

TodoListFooter.propTypes = {
  listLength: PropTypes.number,
  handleMoveTodo: PropTypes.func,
  setHideOnDrag: PropTypes.func,
  showNewTodo: PropTypes.bool,
  handleShowNewTodo: PropTypes.func,
  handlePreventNewTodoOnBlur: PropTypes.func,
  handleAddNewTodo: PropTypes.func,
};
