import React from "react";
import PropTypes from "prop-types";
import QuickTodoEdit from "./QuickTodoEdit.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Todo.css";

export default function Todo({ todo, isDragging, hideOnDrag, isHover }) {
  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.align-items-center.justify-content-between.todo-item 
      div.mb-1 #{todo.name}
      if(isHover)
        button.edit(data-toggle="modal" data-target="#quickTodoEdit")
          FontAwesomeIcon(icon=faPencilAlt)

      QuickTodoEdit
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  isDragging: PropTypes.bool,
  hideOnDrag: PropTypes.bool,
  isHover: PropTypes.bool,
};
