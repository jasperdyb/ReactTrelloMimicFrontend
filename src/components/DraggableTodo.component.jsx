import React, { useEffect, useRef, useState } from "react";
import Todo from "./Todo.component";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function DraggableTodo({
  todo,
  index,
  handleMoveTodo,
  hideOnDrag,
  setHideOnDrag,
  setQuickEditStates,
  quickTodoEditRef,
}) {
  const targetRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [isDraggingElement, setIsDraggingElement] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TODO,
      todo,
      index,
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    },
    begin: () => {
      setTimeout(() => {
        setIsDraggingElement(true);
      }, 10);
    },
    end: () => {
      setIsDraggingElement(false);
      setHideOnDrag(false);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isDragOver, item, canDrop }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => {
      setIsDraggingElement(false);
      handleMoveTodo(todo, index, "middle");
    },
    collect: (monitor) => ({
      isDragOver: !!monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
    hover: () => {
      console.log("isOver", index);
      setHideOnDrag(canDrop);
    },
    canDrop: (todo) => todo.index !== index,
  });

  //clear default drag preview
  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, [preview]);

  const handleOnHover = () => {
    setIsHover(true);
  };

  const handleOnLeave = () => {
    setIsHover(false);
  };

  if (isDraggingElement) {
    if (hideOnDrag) {
      return pug`
        div
      `;
    }

    return pug`
      div.p-2.pb-0
        span.btn.d-flex.todo-blank(style={
                    height:item.height
                  }) 
        `;
  }

  const propsToTodo = {
    todo,
    index,
    isDragging,
    hideOnDrag,
    isDragOver: isHover,
    setQuickEditStates,
    quickTodoEditRef,
  };

  return pug`
    div(ref=drop)
      div.p-2
        div(ref=drag onMouseOver=handleOnHover onMouseLeave = handleOnLeave)
          div(ref=targetRef )
            Todo( ...propsToTodo )

      if isDragOver && canDrop
        div.p-2.pb-0
          span.btn.d-flex.todo-blank(style={
            height:item.height
          }) 
  `;
}

DraggableTodo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleMoveTodo: PropTypes.func,
  hideOnDrag: PropTypes.bool,
  setHideOnDrag: PropTypes.func,
  setQuickEditStates: PropTypes.func,
  quickTodoEditRef: PropTypes.object,
};
