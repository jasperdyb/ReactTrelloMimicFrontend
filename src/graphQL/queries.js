import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";

const queries = {
  GET_TODO_LIST: gql`
    {
      list(orderBy: { order: asc }) {
        id
        name
        order
      }
    }
  `,
};

export default queries;
