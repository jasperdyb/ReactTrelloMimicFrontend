import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export default function NewTodoInput({ handleNewTodoOnBlur, setNewTodo }) {
  const focusRef = useRef(null);

  useLayoutEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleOnChange = (event) => {
    setNewTodo(event.target.value);
  };

  return pug`
    div.p-2.input-group
      textarea.form-control(name="new" ref=focusRef onBlur=handleNewTodoOnBlur onChange=handleOnChange )
  `;
}

NewTodoInput.propTypes = {
  handleNewTodoOnBlur: PropTypes.func,
  setNewTodo: PropTypes.func,
};
