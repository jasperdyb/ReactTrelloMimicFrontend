import React from "react";
// import PropTypes from "prop-types";
import "../css/QuickTodoEditOptions.css";

export default function QuickTodoEditOptions() {
  return pug`
    div.options
      ul.p-1
        li 
          button.option-button Edit tag

        li
          button.option-button Delete
  `;
}
