import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => pug`
  div(className="app")
    header(className="App-header")
      img(src=logo className="App-logo" alt="logo")
      p
      |Edit
      code src/App.js
      |and save to reload.
      a(className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer") Learn React
  `;

export default App;
