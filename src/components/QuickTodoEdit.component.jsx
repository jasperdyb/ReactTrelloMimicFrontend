import React from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";

const QuickTodoEdit = React.forwardRef(
  ({ quickEditStates, handleUpdateTodo, handleDeleteTodo }, focusRef) => {
    const propsToQuickTodoEditTextarea = {
      quickEditStates,
      handleUpdateTodo,
      handleDeleteTodo,
    };

    return pug`
      #quickTodoEdit.modal( 
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
  handleDeleteTodo: PropTypes.func,
};

export default QuickTodoEdit;
