import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Todo.css";

export default function Todo({ todo, isDragging, hideOnDrag }) {
  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.align-items-center.justify-content-between.todo-item #{todo.name}
      button.edit
        FontAwesomeIcon(icon=faPencilAlt)
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  isDragging: PropTypes.bool,
  hideOnDrag: PropTypes.bool,
};
