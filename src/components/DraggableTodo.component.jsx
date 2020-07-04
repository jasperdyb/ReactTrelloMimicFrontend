import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
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

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TODO,
      todo,
      index,
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    },
    end: () => {
      setHideOnDrag(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, item, canDrop }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => {
      handleMoveTodo(todo, index, "middle");
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (todo) => todo.index !== index,
  });

  //clear default drag preview
  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, [preview]);

  useLayoutEffect(() => {
    if (isOver) {
      setHideOnDrag(isOver);
    }
  }, [setHideOnDrag, isOver]);

  const handleOnHover = () => {
    setIsHover(true);
  };

  const handleOnLeave = () => {
    setIsHover(false);
  };

  // DOM while dragging
  if (isDragging && hideOnDrag) {
    return pug`
      div
    `;
  }

  const propsToTodo = {
    todo,
    index,
    isDragging,
    hideOnDrag,
    isHover,
    setQuickEditStates,
    quickTodoEditRef,
  };

  return pug`
    div(ref=drop)
      div.p-2
        div(ref=drag onMouseOver=handleOnHover onMouseLeave = handleOnLeave)
          div(ref=targetRef )
            Todo( ...propsToTodo )

      if isOver && canDrop
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
