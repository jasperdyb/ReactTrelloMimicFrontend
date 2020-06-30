import React, { useState } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo.component";
import TodoListHeader from "./TodoListHeader.component";
import TodoListFooter from "./TodoListFooter.component";

export default function TodoList(props) {
  const [todoItems, setTodoItems] = useState(props.todoItems);

  const [hideOnDrag] = useState(false);

  const handleMoveTodo = (fromTodo, toIndex, where) => {
    const fromIndex = fromTodo.index;
    const movedTodo = todoItems.splice(fromIndex, 1);

    let newTodos = [];
    switch (where) {
      case "top":
        newTodos = movedTodo.concat(todoItems);
        break;
      case "bottom":
        newTodos = todoItems.concat(movedTodo);
        break;
      default:
        const tails = todoItems.splice(toIndex + 1);
        newTodos = todoItems.concat(movedTodo).concat(tails);
    }

    console.log(newTodos);
    setTodoItems(newTodos);
  };

  const Todos = todoItems.map((todo, index) => {
    const propsToTodo = {
      todo,
      index,
      handleMoveTodo,
      hideOnDrag,
    };
    return pug`
      Todo(key=index ...propsToTodo ) 
    `;
  });

  const propsToTodoListHeader = { handleMoveTodo, hideOnDrag };
  const propsToTodoListFooter = { handleMoveTodo, hideOnDrag };

  return pug`
    .d-flex.justify-content-center
      .card.todo-list
        TodoListHeader( title ="Todo List" ...propsToTodoListHeader)
        .card-body.p-0
          div #{Todos}

        TodoListFooter(...propsToTodoListFooter)
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
