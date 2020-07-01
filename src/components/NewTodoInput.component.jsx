import React, { useRef, useLayoutEffect } from "react";

export default function NewTodoInput() {
  const focusRef = useRef(null);

  useLayoutEffect(() => {
    focusRef.current.focus();
  }, []);

  return pug`
    div.p-2.input-group
      textarea.form-control(ref=focusRef)
  `;
}
