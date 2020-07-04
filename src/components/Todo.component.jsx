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

  const handleClick = (e) => {
    e.preventDefault();

    const { top, left, width } = targetRef.current.getBoundingClientRect();
    setQuickEditStates({
      show: true,
      dimensions: {
        top: top,
        left: left,
        width: width,
      },
      value: todo.name,
      index,
    });
  };

  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.todo-item(ref=targetRef) 
      div.text-left.mb-1.todo-text #{todo.name}
      if(isHover)
        button.edit.mr-1( onClick=handleClick onContextMenu=handleClick)
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
