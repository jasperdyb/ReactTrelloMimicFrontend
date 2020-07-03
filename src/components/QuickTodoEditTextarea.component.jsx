import React from "react";
import PropTypes from "prop-types";
import "../css/QuickTodoEditTextarea.css";

export default function QuickTodoEditTextarea({ dimensions }) {
  const styles = {
    position: "relative",
    margin: 0,
    ...dimensions,
  };

  return pug`
    div.modal-dialog(style=styles)
      div.modal-content
        div.input-group
          textarea.form-control
  `;
}

QuickTodoEditTextarea.propTypes = {
  dimensions: PropTypes.object,
};
