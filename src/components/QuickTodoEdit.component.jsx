import React from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";

const QuickTodoEdit = React.forwardRef(
  ({ quickEditStates, handleUpdateTodo }, focusRef) => {
    const styles = {
      show: quickEditStates.show,
      display: quickEditStates.display,
    };

    const propsToQuickTodoEditTextarea = {
      quickEditStates,
      handleUpdateTodo,
    };

    return pug`
      #quickTodoEdit.modal( 
        style=styles,
        data-keyboard="false", 
        tabIndex="-1", 
        role="dialog")
        QuickTodoEditTextarea(ref=focusRef ...propsToQuickTodoEditTextarea)
      `;
  }
);

QuickTodoEdit.propTypes = {
  quickEditStates: PropTypes.object,
  handleUpdateTodo: PropTypes.func,
};

export default QuickTodoEdit;
