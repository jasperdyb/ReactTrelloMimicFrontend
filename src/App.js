import React from "react";
import "./css/App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "./dnd/customDragLayer";

// Components
import TodoList from "./components/TodoList.component.jsx";

//graphQL
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_TODO_LIST = gql`
  query {
    list {
      id
      name
    }
  }
`;

const App = () => (
  <Query query={GET_TODO_LIST}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return pug`
        DndProvider(backend=HTML5Backend)
          CustomDragLayer 
          TodoList(todoItems=data.list)
    `;
    }}
  </Query>
);

export default App;
