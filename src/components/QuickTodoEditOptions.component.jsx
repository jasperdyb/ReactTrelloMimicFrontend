import React from "react";
import PropTypes from "prop-types";
import "../css/QuickTodoEditOptions.css";

export default function QuickTodoEditOptions({ index, handleDeleteTodo }) {
  return pug`
    div.options
      ul.p-1
        li
          button.option-button(onClick=(e)=>handleDeleteTodo(index)) Delete
  `;
}

QuickTodoEditOptions.propTypes = {
  index: PropTypes.number,
  handleDeleteTodo: PropTypes.func,
};
