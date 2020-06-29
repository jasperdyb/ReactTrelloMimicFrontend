import React from "react";
import PropTypes from "prop-types";

export default function Todo({ todo }) {
  return pug`
    a.btn.d-flex.todo-item(href="#") #{todo.name}
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
};
