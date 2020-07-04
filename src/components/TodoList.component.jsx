import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import DraggableTodo from "./DraggableTodo.component";
import TodoListHeader from "./TodoListHeader.component";
import TodoListFooter from "./TodoListFooter.component";
import NewTodoInput from "./NewTodoInput.component";
import QuickTodoEdit from "./QuickTodoEdit.component";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

export default function TodoList(props) {
  const [todoItems, setTodoItems] = useState(props.todoItems);
  const [hideOnDrag, setHideOnDrag] = useState(false);
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [quickEditStates, setQuickEditStates] = useState({
    dimensions: { top: 0, left: 0, width: 0 },
    value: "",
    index: -1,
  });

  const newTodoInputRef = useRef(null);
  const quickTodoEditRef = useRef(null);

  let hideNewTodo = true;

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

    let newTodos = [];
    switch (where) {
      case "top":
        newTodos = movedTodo.concat(todoItems);
        break;
      case "bottom":
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

  const handleShowNewTodo = () => {
    setShowNewTodo(true);
  };

  function AddNewTodo(newTodo) {
    const newTodoItem = [
      {
        name: newTodo,
        finished: false,
      },
    ];
    const newTodos = todoItems.concat(newTodoItem);
    setTodoItems(newTodos);

    setNewTodo("");
    hideNewTodo = true;
    setShowNewTodo(false);
  }

  const handleAddNewTodo = () => {
    console.log("newTodo", newTodo);
    if (newTodo) {
      AddNewTodo(newTodo);
    } else {
      newTodoInputRef.current.focus();
      hideNewTodo = true;
    }
  };

  const handleUpdateTodo = (index, newTodoName) => {
    if (todoItems[index] !== newTodoName && newTodoName) {
      let newTodoItems = [...todoItems];
      newTodoItems[index].name = newTodoName;
      setTodoItems(newTodoItems);
      setQuickEditStates({
        ...quickEditStates,
        value: "",
      });
    }
  };
  //fire before onBlur to prevent setShowNewTodo(false)
  const handlePreventNewTodoOnBlur = () => {
    hideNewTodo = false;
  };

  const handleNewTodoOnBlur = () => {
    if (newTodo) {
      AddNewTodo(newTodo);
    } else if (hideNewTodo) {
      setShowNewTodo(false);
    }
  };

  const Todos = todoItems.map((todo, index) => {
    const propsToTodo = {
      todo,
      index,
      handleMoveTodo,
      hideOnDrag,
      setHideOnDrag,
      setQuickEditStates,
      quickTodoEditRef,
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
    handleShowNewTodo,
    handlePreventNewTodoOnBlur,
    handleAddNewTodo,
  };
  const propsToNewTodoInput = {
    handleNewTodoOnBlur,
    setNewTodo,
  };
  const propsToQuickTodoEdit = {
    quickEditStates,
    handleUpdateTodo,
  };

  return pug`
    div
      .d-flex.justify-content-center
        .card.todo-list(ref =drop)
          TodoListHeader( title ="Todo List" ...propsToTodoListHeader)
          .card-body.p-0
            div #{Todos}
            
            if showNewTodo
              NewTodoInput(ref=newTodoInputRef ...propsToNewTodoInput)

          TodoListFooter(...propsToTodoListFooter)

      QuickTodoEdit(ref=quickTodoEditRef ...propsToQuickTodoEdit )
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
