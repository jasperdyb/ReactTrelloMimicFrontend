import React from "react";
import "./App.css";

// bootstrap
// import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/Button";

// const todos = [
//   {
//     name: "buy meat",
//     finished: false,
//   },
// ];

const App = () => pug`
  div
    .jumbotron
      h1.display-4 Hello, world!
      p.lead
        | This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
      hr.my-4
      p
        | It uses utility classes for typography and spacing to space content out within the larger container.
      a.btn.btn-primary.btn-lg(href="#", role="button") Learn more
  `;

export default App;
