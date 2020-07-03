import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import QuickTodoEdit from "./QuickTodoEdit.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Todo.css";

export default function Todo({ todo, isDragging, hideOnDrag, isHover }) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleClick = () => {
    const { top, left, width } = targetRef.current.getBoundingClientRect();
    setDimensions({
      top: top,
      left: left,
      width: width,
    });

    console.log(dimensions, top, left, width);
  };

  //TODO 預設預覽: todo原位顯示灰色塊

  return pug`
    div.btn.d-flex.align-items-center.justify-content-between.todo-item(ref=targetRef) 
      div.mb-1 #{todo.name}
      if(isHover)
        button.edit(data-toggle="modal" data-target="#quickTodoEdit" onClick=handleClick)
          FontAwesomeIcon(icon=faPencilAlt)

      QuickTodoEdit(dimensions=dimensions)
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  isDragging: PropTypes.bool,
  hideOnDrag: PropTypes.bool,
  isHover: PropTypes.bool,
};
