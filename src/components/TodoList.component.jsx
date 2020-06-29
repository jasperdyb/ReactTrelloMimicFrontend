import React, { useState } from "react";
import PropTypes from "prop-types";
// import { ItemTypes } from "../dnd/constants.js";
// import { useDrop } from "react-dnd";
import Todo from "./Todo.component";
import TodoListHeader from "./TodoListHeader.component";
import TodoListFooter from "./TodoListFooter.component";

export default function TodoList(props) {
  const [todoItems, setTodoItems] = useState(props.todoItems);

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

    setTodoItems(newTodos);
  };

  const Todos = todoItems.map((todo, index) => {
    const propsToTodo = { todo, index, handleMoveTodo };
    return pug`
      Todo(key=index ...propsToTodo ) 
    `;
  });

  // const [{ isOverOnTop }, drop] = useDrop({
  //   accept: ItemTypes.TODO,
  //   drop: (todo) => handleMoveTodo(todo, 0, "top"),
  //   collect: (monitor) => ({
  //     isOverOnTop: !!monitor.isOver(),
  //   }),
  //   canDrop: (todo) => todo.index !== 0,
  // });

  // const [{ isOverOnBottom }, dropOnBottom] = useDrop({
  //   accept: ItemTypes.TODO,
  //   dropOnBottom: (todo) => handleMoveTodo(todo, todoItems.length - 1),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  //   canDrop: (todo) => todo.index !== todoItems.length - 1,
  // });

  return pug`
    .d-flex.justify-content-center
      .card.todo-list
        TodoListHeader( title ="Todo List" handleMoveTodo=handleMoveTodo)
        .card-body.p-2
          div #{Todos}

        TodoListFooter(handleMoveTodo =handleMoveTodo)
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
