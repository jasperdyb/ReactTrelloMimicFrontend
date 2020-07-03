import React from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";

const QuickTodoEdit = React.forwardRef(
  ({ dimensions, quickEditValue }, focusRef) => {
    return pug`
      #quickTodoEdit.modal( 
        data-keyboard="false", 
        tabIndex="-1", 
        role="dialog", 
        aria-labelledby="staticBackdropLabel", 
        aria-hidden="true")
        QuickTodoEditTextarea(dimensions=dimensions ref=focusRef todoValue=quickEditValue)
      `;
  }
);

QuickTodoEdit.propTypes = {
  dimensions: PropTypes.object,
  quickEditValue: PropTypes.string,
};

export default QuickTodoEdit;
