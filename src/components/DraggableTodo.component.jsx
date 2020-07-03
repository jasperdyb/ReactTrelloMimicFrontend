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
  setQuickEditDimensions,
  quickTodoEditRef,
}) {
  const targetRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TODO,
      todo,
      index,
      width: dimensions.width,
      height: dimensions.height,
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
    // eslint-disable-next-line
  }, []);

  //get mounted dom dimensions
  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }

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
    isDragging,
    hideOnDrag,
    isHover,
    setQuickEditDimensions,
    quickTodoEditRef,
  };

  return pug`
    div(ref=drop)
      div.p-2
        div(ref=drag onMouseOver=handleOnHover onMouseLeave = handleOnLeave)
          div(ref=targetRef )
            Todo(...propsToTodo )

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
  setQuickEditDimensions: PropTypes.func,
  quickTodoEditRef: PropTypes.object,
};
