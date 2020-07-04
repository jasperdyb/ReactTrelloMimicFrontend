import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QuickTodoEditOptions from "./QuickTodoEditOptions.component";
import "../css/QuickTodoEditTextarea.css";

const QuickTodoEditTextarea = React.forwardRef(
  ({ quickEditStates, handleUpdateTodo, handleDeleteTodo }, focusRef) => {
    const [editedTodo, setEditedTodo] = useState("");

    const styles = {
      position: "relative",
      margin: 0,
      ...quickEditStates.dimensions,
    };

    useEffect(() => {
      setEditedTodo(quickEditStates.value);
      // eslint-disable-next-line
    }, [setEditedTodo, quickEditStates]);

    const handleOnFocus = (event) => {
      const target = event.target;
      setTimeout(() => target.select(), 0); //make select async
    };

    const handleOnChange = (event) => {
      setEditedTodo(event.target.value);
    };

    const handleOnBlur = () => {
      setEditedTodo("");
      // handleUpdateTodo(quickEditStates.index, editedTodo);
    };

    return pug`
      div.modal-dialog(style=styles)
        div.modal-content
          div.textarea-size
            textarea.form-control(ref=focusRef 
              value = editedTodo
              onFocus=handleOnFocus 
              onChange=handleOnChange
              onBlur=handleOnBlur)
              
          button.btn.btn-success.mt-2.save-button(
            data-toggle="modal" data-target="#quickTodoEdit"
            onClick = (e)=>handleUpdateTodo(quickEditStates.index,editedTodo)) Save
          QuickTodoEditOptions(index=quickEditStates.index handleDeleteTodo=handleDeleteTodo)
    `;
  }
);

QuickTodoEditTextarea.propTypes = {
  quickEditStates: PropTypes.object,
  handleUpdateTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};

export default QuickTodoEditTextarea;
