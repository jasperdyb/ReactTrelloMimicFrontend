import React from "react";
import PropTypes from "prop-types";

export default function TodoList({ todoItems }) {
  const Todos = todoItems.map((todo, index) => {
    return pug`
      a.btn.d-flex.todo-item(href="#" key=todo.name) #{todo.name}
    `;
  });

  return pug`
    .d-flex.justify-content-center
      .card.todo-list
        .card-header
          h5.card-title Todo
          div #{Todos}

        .card-body.p-2
          // Todos

        .card-footer
          a.btn.btn-light(href="#") + Add todo
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
