import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import DraggableTodo from "./DraggableTodo.component";
import TodoListHeader from "./TodoListHeader.component";
import TodoListFooter from "./TodoListFooter.component";
import NewTodoInput from "./NewTodoInput.component";
import QuickTodoEdit from "./QuickTodoEdit.component";
import { ItemTypes } from "../dnd/constants.js";
import { useDrop } from "react-dnd";

//GraphQL
import queries from "../graphQL/queries.js";
import mutations from "../graphQL/mutations.js";
import { useMutation } from "@apollo/react-hooks";

export default function TodoList({ todoItems }) {
  // const [todoItems, setTodoItems] = useState(props.todoItems);
  const [hideOnDrag, setHideOnDrag] = useState(false);
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [quickEditStates, setQuickEditStates] = useState({
    show: false,
    dimensions: { top: 0, left: 0, width: 0 },
    value: "",
    index: -1,
  });

  // graphQL hooks
  const [addTodo] = useMutation(mutations.ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      const { list } = cache.readQuery({ query: queries.GET_TODO_LIST });
      cache.writeQuery({
        query: queries.GET_TODO_LIST,
        data: { list: list.concat([addTodo]) },
      });
    },
  });
  const [updateTodoName] = useMutation(mutations.UPDATE_TODO_NAME);
  const [deleteTodo] = useMutation(mutations.DELETE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      const { list } = cache.readQuery({ query: queries.GET_TODO_LIST });
      cache.writeQuery({
        query: queries.GET_TODO_LIST,
        data: { list: list.filter((todo) => todo.id !== deleteTodo.id) },
      });
    },
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

  function handleMoveTodo(fromTodo, toIndex, where) {
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

    // setTodoItems(newTodos);
  }

  function handleShowNewTodo() {
    setShowNewTodo(true);
  }

  async function AddNewTodo() {
    console.log(todoItems.length, typeof todoItems.length);
    await addTodo({ variables: { name: newTodo, order: todoItems.length } });

    setNewTodo("");
    hideNewTodo = true;
    setShowNewTodo(false);
  }

  function handleAddNewTodo() {
    if (newTodo) {
      AddNewTodo();
    } else {
      newTodoInputRef.current.focus();
      hideNewTodo = true;
    }
  }

  async function handleUpdateTodo(index, newTodoName) {
    if (todoItems[index] !== newTodoName && newTodoName) {
      const id = todoItems[index].id;

      await updateTodoName({ variables: { id, name: newTodoName } });

      setQuickEditStates({
        ...quickEditStates,
        value: "",
      });
    }

    setQuickEditStates({
      show: false,
    });
  }

  async function handleDeleteTodo(index) {
    const id = todoItems[index].id;

    await deleteTodo({ variables: { id } });

    setQuickEditStates({
      show: false,
    });
  }

  //fire before onBlur to prevent setShowNewTodo(false)
  function handlePreventNewTodoOnBlur() {
    hideNewTodo = false;
  }

  function handleNewTodoOnBlur() {
    if (newTodo) {
      AddNewTodo();
    } else if (hideNewTodo) {
      setShowNewTodo(false);
    }
  }

  function handleDragLeave(e) {
    setHideOnDrag(false);
  }

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
      DraggableTodo(key=todo.order ...propsToTodo ) 
    `;
  });

  const propsToTodoListHeader = {
    handleMoveTodo,
    setHideOnDrag,
  };
  const propsToTodoListFooter = {
    listLength: todoItems.length,
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
    setQuickEditStates,
    handleUpdateTodo,
    handleDeleteTodo,
  };

  return pug`
    div
      .d-flex.justify-content-center
        .card.todo-list.p-1(ref =drop onDragLeave=handleDragLeave)
          .div(onDragLeave=(e)=>e.stopPropagation())
            TodoListHeader( title ="Todo List" ...propsToTodoListHeader)
            .card-body.p-0
              div #{Todos}
              
              if showNewTodo
                NewTodoInput(ref=newTodoInputRef ...propsToNewTodoInput)

            TodoListFooter(...propsToTodoListFooter)

      if quickEditStates.show
        QuickTodoEdit(ref=quickTodoEditRef ...propsToQuickTodoEdit )
    `;
}

TodoList.propTypes = {
  todoItems: PropTypes.array,
};
