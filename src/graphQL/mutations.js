import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";

const mutations = {
  ADD_TODO: gql`
    mutation AddTodo($name: String!, $order: Int!) {
      addTodo(name: $name, order: $order) {
        id
        name
        order
      }
    }
  `,
  UPDATE_TODO_NAME: gql`
    mutation UpdateTodoName($id: ID!, $name: String!) {
      updateTodoName(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_LIST_ORDER: gql`
    mutation UpdateListOrder($newOrder: [Order!]!) {
      updateListOrder(newOrder: $newOrder) {
        id
        order
        name
        finished
      }
    }
  `,
  DELETE_TODO: gql`
    mutation DeleteTodo($id: ID!) {
      deleteTodo(id: $id) {
        id
      }
    }
  `,
};

export default mutations;
