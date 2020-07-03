import React from "react";
import PropTypes from "prop-types";
import "../css/QuickTodoEditTextarea.css";

const QuickTodoEditTextarea = React.forwardRef(
  ({ dimensions, todoValue }, focusRef) => {
    const styles = {
      position: "relative",
      margin: 0,
      ...dimensions,
    };

    const handleOnFocus = (event) => {
      const target = event.target;
      setTimeout(() => target.select(), 0); //make select async
    };

    return pug`
      div.modal-dialog(style=styles)
        div.modal-content
          div.input-group
            textarea.form-control(ref=focusRef defaultValue=todoValue onFocus=handleOnFocus)
    `;
  }
);

QuickTodoEditTextarea.propTypes = {
  dimensions: PropTypes.object,
  todoValue: PropTypes.string,
};

export default QuickTodoEditTextarea;
