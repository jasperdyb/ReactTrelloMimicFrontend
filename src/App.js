import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Components
import TodoList from "./components/TodoList.component.jsx";

//dummy
const todoItems = [
  {
    name: "todo1",
    finished: false,
  },
  {
    name: "todo2",
    finished: false,
  },
  {
    name: "todo3",
    finished: false,
  },
];

const App = () => pug`
  DndProvider(backend=HTML5Backend)
    TodoList(todoItems=todoItems)
  `;

export default App;
