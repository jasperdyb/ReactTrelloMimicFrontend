import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";

const mutations = {
  ADD_TODO: gql`
    mutation AddTodo($name: String!) {
      addTodo(name: $name) {
        id
        name
      }
    }
  `,
};

export default mutations;
