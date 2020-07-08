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
  UPDATE_TODO: gql`
    mutation UpdateTodo($id: ID!, $name: String!) {
      updateTodo(id: $id, name: $name) {
        id
        name
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
