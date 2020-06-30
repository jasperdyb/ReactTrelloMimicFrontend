import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../dnd/constants.js";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function Todo({ todo, index, handleMoveTodo }) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
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
  }, []);

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

  const [{ isOver, item }, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => handleMoveTodo(todo, index, "middle"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
    canDrop: (todo) => todo.index !== index,
  });

  return pug`
    div.p-2(ref=drop
      style={
        position: 'relative',
        width: '100%',
        height: '100%',
      })
      div(ref=drag
        style={
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
        })
        a.btn.d-flex.todo-item(href="#" ref=targetRef) #{todo.name }

      if isOver 
        div.pt-2.pb-0
          span.btn.d-flex.todo-blank(href="#" style={
            height:item.height
          }) 
  `;
}

Todo.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  handleMoveTodo: PropTypes.func,
};
