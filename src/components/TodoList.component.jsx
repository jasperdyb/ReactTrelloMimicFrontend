import React, { useState } from "react";
import PropTypes from "prop-types";
import DraggableTodo from "./DraggableTodo.component";
import TodoListHeader from "./TodoListHeader.component";
import TodoListFooter from "./TodoListFooter.component";
import NewTodoInput from "./NewTodoInput.component";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoList(props) {
  const [todoItems, setTodoItems] = useState(props.todoItems);
  const [hideOnDrag, setHideOnDrag] = useState(false);
  const [showNewTodo, setShowNewTodo] = useState(false);

  // eslint-disable-next-line
  const [{}, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: (todo) => {
      setHideOnDrag(false);
    },
  });

  const handleMoveTodo = (fromTodo, toIndex, where) => {
    const fromIndex = fromTodo.index;
    const movedTodo = todoItems.splice(fromIndex, 1);
    console.log(fromIndex);

    let newTodos = [];
    switch (where) {
      case "top":
        newTodos = movedTodo.concat(todoItems);
        break;
      case "bottom":
        console.log(movedTodo);
        newTodos = todoItems.concat(movedTodo);
        break;
      default:
        let tails = [];
        if (fromIndex < toIndex) {
          tails = todoItems.splice(toIndex);
        } else {
          tails = todoItems.splice(toIndex + 1);
        }

        newTodos = todoItems.concat(movedTodo).concat(tails);
    }

    setTodoItems(newTodos);
  };

  const handleAddNewTodo = () => {
    setShowNewTodo(true);
  };

  const Todos = todoItems.map((todo, index) => {
    const propsToTodo = {
      todo,
      index,
      handleMoveTodo,
      hideOnDrag,
      setHideOnDrag,
    };
    return pug`
      DraggableTodo(key=index ...propsToTodo ) 
    `;
  });

  const propsToTodoListHeader = {
    handleMoveTodo,
    setHideOnDrag,
  };
  const propsToTodoListFooter = {
    handleMoveTodo,
    setHideOnDrag,
    showNewTodo,
    handleAddNewTodo,
  };

  return pug`
    .d-flex.justify-content-center
      .card.todo-list(ref =drop)
        TodoListHeader( title ="Todo List" ...propsToTodoListHeader)
        .card-body.p-0
          div #{Todos}
          
          if showNewTodo
            NewTodoInput

        TodoListFooter(...propsToTodoListFooter)
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
