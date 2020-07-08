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
  const [refDimensions, setRefDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isDraggingElement, setIsDraggingElement] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TODO,
      todo,
      index,
      width: refDimensions.width,
      height: refDimensions.height,
    },
    begin: () => {
      // Call isDragging to dismount drag source will cause browser fire endDrag right away,
      // so use an extra state to control.
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
      setRefDimensions({
        width: todo.width,
        height: todo.height,
      });
    },
    collect: (monitor) => ({
      isDragOver: !!monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
    hover: () => {
      setHideOnDrag(canDrop);
    },
    canDrop: (todo) => todo.index !== index,
  });

  //clear default drag preview
  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
    // eslint-disable-next-line
  }, []);

  //update drag source dimension
  useEffect(() => {
    if (targetRef.current) {
      setRefDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [todo]);

  const handleOnHover = () => {};

  const handleOnLeave = () => {};

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
  //TODO fix: element -1 index will become isHover and show edit icon

  const propsToTodo = {
    todo,
    index,
    isDragging,
    hideOnDrag,
    isDragOver,
    setQuickEditStates,
    quickTodoEditRef,
  };

  return pug`
    div(ref=drop)
      div.p-2
        div(ref=drag onMouseOver=handleOnHover onMouseLeave = handleOnLeave)
          Todo(ref=targetRef  ...propsToTodo )

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
