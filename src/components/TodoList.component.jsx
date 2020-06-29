import React, { useState } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo.component";
// import { ItemTypes } from "../dnd/constants.js";
// import { useDrop } from "react-dnd";

export default function TodoList(props) {
  const [todoItems, setTodoItems] = useState(props.todoItems);

  const handleMoveTodo = (fromTodo, toIndex) => {
    const fromIndex = fromTodo.index;
    const movedTodo = todoItems.splice(fromIndex, 1);
    const tails = todoItems.splice(toIndex + 1);
    const newTodos = todoItems.concat(movedTodo).concat(tails);
    setTodoItems(newTodos);
  };

  const Todos = todoItems.map((todo, index) => {
    const propsToTodo = { todo, index, handleMoveTodo };
    return pug`
      Todo(key=index ...propsToTodo ) 
    `;
  });

  return pug`
    .d-flex.justify-content-center
      .card.todo-list
        .card-header
          h5.card-title Todo

        .card-body.p-2
          div #{Todos}

        .card-footer
          a.btn.btn-light(href="#") + Add todo
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
