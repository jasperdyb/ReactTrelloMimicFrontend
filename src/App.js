import React from "react";
import "./css/App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "./dnd/customDragLayer";

// Components
import TodoList from "./components/TodoList.component.jsx";

//graphQL
import queries from "./graphQL/queries.js";
import { useQuery } from "@apollo/react-hooks";

const App = () => {
  const { loading, error, data } = useQuery(queries.GET_TODO_LIST);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;

  return pug`
    DndProvider(backend=HTML5Backend)
      CustomDragLayer 
      TodoList(todoItems=data.list)
`;
};

export default App;
