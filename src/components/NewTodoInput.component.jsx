import React, { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export default function NewTodoInput({ handleNewTodoOnBlur }) {
  const focusRef = useRef(null);

  useLayoutEffect(() => {
    focusRef.current.focus();
  }, []);

  return pug`
    div.p-2.input-group
      textarea.form-control(ref=focusRef onBlur=handleNewTodoOnBlur)
  `;
}

NewTodoInput.propTypes = {
  handleNewTodoOnBlur: PropTypes.func,
};
