import React, { useEffect } from "react";
import PropTypes from "prop-types";
import QuickTodoEditOptions from "./QuickTodoEditOptions.component";
import "../css/QuickTodoEditTextarea.css";

const QuickTodoEditTextarea = React.forwardRef(
  (
    {
      quickEditStates,
      editedTodo,
      setEditedTodo,
      handleUpdateTodo,
      handleDeleteTodo,
    },
    focusRef
  ) => {
    const styles = {
      position: "relative",
      margin: 0,
      ...quickEditStates.dimensions,
    };

    useEffect(() => {
      setEditedTodo(quickEditStates.value);

      focusRef.current.focus();
    }, [setEditedTodo, quickEditStates, focusRef]);

    const handleOnFocus = (event) => {
      const target = event.target;
      setTimeout(() => target.select(), 0); //make select async
    };

    const handleOnChange = (event) => {
      setEditedTodo(event.target.value);
    };

    const handleClick = (e) => {
      handleUpdateTodo(quickEditStates.index, editedTodo);
    };

    function handleChildClick(e) {
      e.stopPropagation();
    }

    return pug`
      #quickTodoEditTextarea(style=styles onClick=handleChildClick)
        div.textarea-size
          textarea.form-control(ref=focusRef 
            value = editedTodo
            onFocus=handleOnFocus 
            onChange=handleOnChange)
            
        button.btn.btn-success.mt-2.save-button(onClick =handleClick) Save
        QuickTodoEditOptions(index=quickEditStates.index handleDeleteTodo=handleDeleteTodo)
    `;
  }
);

QuickTodoEditTextarea.propTypes = {
  quickEditStates: PropTypes.object,
  editedTodo: PropTypes.string,
  setEditedTodo: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};

export default QuickTodoEditTextarea;
