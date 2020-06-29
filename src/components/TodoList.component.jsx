import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo.component";

export default function TodoList({ todoItems }) {
  const Todos = todoItems.map((todo, index) => {
    return pug`
      Todo(key=todo.name todo=todo) 
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
