import React from "react";
import PropTypes from "prop-types";
import QuickTodoEditTextarea from "./QuickTodoEditTextarea.component";

export default function QuickTodoEdit({ dimensions }) {
  return pug`
    #quickTodoEdit.modal( 
      data-keyboard="false", 
      tabIndex="-1", 
      role="dialog", 
      aria-labelledby="staticBackdropLabel", 
      aria-hidden="true")
      QuickTodoEditTextarea(dimensions=dimensions)
    `;
}

QuickTodoEdit.propTypes = {
  dimensions: PropTypes.object,
};
