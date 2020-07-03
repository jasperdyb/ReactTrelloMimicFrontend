import React from "react";
import PropTypes from "prop-types";
import "../css/QuickTodoEditTextarea.css";

const QuickTodoEditTextarea = React.forwardRef(({ dimensions }, focusRef) => {
  const styles = {
    position: "relative",
    margin: 0,
    ...dimensions,
  };

  return pug`
    div.modal-dialog(style=styles)
      div.modal-content
        div.input-group
          textarea.form-control(ref=focusRef)
  `;
});

QuickTodoEditTextarea.propTypes = {
  dimensions: PropTypes.object,
};

export default QuickTodoEditTextarea;
