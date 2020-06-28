import React from "react";
import "./App.css";

// const todos = [
//   {
//     name: "buy meat",
//     finished: false,
//   },
// ];

const App = () => pug`
  .card(styles="width: 18rem;")
    .card-header
      h5.card-title Todo

    .card-body
      a.btn.btn-primary(href="#") Add todo
  `;

export default App;
