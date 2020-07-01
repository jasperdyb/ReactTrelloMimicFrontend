import React from "react";
import PropTypes from "prop-types";

export default function Todo({ todo }) {
  return pug`
    div.btn.d-flex.todo-item #{todo.name}
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
};
