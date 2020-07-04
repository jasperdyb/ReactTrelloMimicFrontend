import React, { useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Todo.css";

export default function Todo({
  todo,
  index,
  isDragging,
  hideOnDrag,
  isHover,
  setQuickEditStates,
  quickTodoEditRef,
}) {
  const targetRef = useRef();

  const handleClick = () => {
    const { top, left, width } = targetRef.current.getBoundingClientRect();
    setQuickEditStates({
      dimensions: {
        top: top,
        left: left,
        width: width,
      },
      value: todo.name,
      index,
    });

    quickTodoEditRef.current.focus();
  };

  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.align-items-center.justify-content-between.todo-item(ref=targetRef) 
      div.mb-1 #{todo.name}
      if(isHover)
        button.edit(data-toggle="modal" data-target="#quickTodoEdit" onClick=handleClick)
          FontAwesomeIcon(icon=faPencilAlt)
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  isDragging: PropTypes.bool,
  hideOnDrag: PropTypes.bool,
  isHover: PropTypes.bool,
  setQuickEditStates: PropTypes.func,
  quickTodoEditRef: PropTypes.object,
};
