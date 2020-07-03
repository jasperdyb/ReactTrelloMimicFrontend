import React from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";

const QuickTodoEdit = React.forwardRef(({ dimensions }, focusRef) => {
  return pug`
    #quickTodoEdit.modal( 
      data-keyboard="false", 
      tabIndex="-1", 
      role="dialog", 
      aria-labelledby="staticBackdropLabel", 
      aria-hidden="true")
      QuickTodoEditTextarea(dimensions=dimensions ref=focusRef)
    `;
});

QuickTodoEdit.propTypes = {
  dimensions: PropTypes.object,
};

export default QuickTodoEdit;
