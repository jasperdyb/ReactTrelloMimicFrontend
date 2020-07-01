import React from "react";
import PropTypes from "prop-types";

export default function Todo({ todo, isDragging, hideOnDrag }) {
  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.todo-item #{todo.name}
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  isDragging: PropTypes.bool,
  hideOnDrag: PropTypes.bool,
};
