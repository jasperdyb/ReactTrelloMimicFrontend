import React from "react";
import Todo from "./Todo.component";
import PropTypes from "prop-types";

export default function TodoDragPreview({ todo, width, height }) {
  const styles = {
    transform: "rotate(5deg)",
    WebkitTransform: "rotate(5deg)",
    width: width,
    height: height,
  };

  return pug`
    div(style=styles)
      Todo(todo=todo)
  `;
}

TodoDragPreview.propTypes = {
  todo: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};
