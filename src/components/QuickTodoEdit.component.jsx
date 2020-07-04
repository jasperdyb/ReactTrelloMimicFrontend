import React, { useState } from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";
import "../css/QuickTodoEdit.css";

const QuickTodoEdit = React.forwardRef(
  (
    { quickEditStates, setQuickEditStates, handleUpdateTodo, handleDeleteTodo },
    focusRef
  ) => {
    const [editedTodo, setEditedTodo] = useState("");

    const propsToQuickTodoEditTextarea = {
      quickEditStates,
      editedTodo,
      setEditedTodo,
      handleUpdateTodo,
      handleDeleteTodo,
    };

    function handleClick(e) {
      handleUpdateTodo(quickEditStates.index, editedTodo);
    }

    return pug`
      #quickTodoEdit(onClick=handleClick)
        QuickTodoEditTextarea(ref=focusRef ...propsToQuickTodoEditTextarea )
      `;
  }
);

QuickTodoEdit.propTypes = {
  quickEditStates: PropTypes.object,
  setQuickEditStates: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};

export default QuickTodoEdit;
