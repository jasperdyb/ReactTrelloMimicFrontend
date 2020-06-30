import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function Todo({ todo, index, handleMoveTodo, hideOnDrag }) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [hide, setHide] = useState(hideOnDrag);

  //clear default drag preview
  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
    // eslint-disable-next-line
  }, []);

  const [{ isOver, item, canDrop }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, index, "middle"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (todo) => todo.index !== index,
  });

  //get mounted dom dimensions
  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }

    if (isOver) {
      setHide(isOver);
    }
  }, [hideOnDrag, isOver]);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TODO,
      todo,
      index,
      width: dimensions.width,
      height: dimensions.height,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (isDragging && hide) {
    return pug`
      div(ref=drop)
    `;
  }

  return pug`
    div(ref=drop)
      div.p-2
        div(ref=drag
          style={
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          })
          a.btn.d-flex.todo-item(href="#" ref=targetRef) #{todo.name }

      if isOver && canDrop
        div.p-2.pb-0
          span.btn.d-flex.todo-blank(href="#" style={
            height:item.height
          }) 
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleMoveTodo: PropTypes.func,
  hideOnDrag: PropTypes.bool,
};
