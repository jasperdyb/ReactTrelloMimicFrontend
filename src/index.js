import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// let connection = "https://powerful-savannah-37896.herokuapp.com/graphql";
// if (process.env.NODE_ENV !== "production") {
//   // 如果不是 production 模式
//   connection = "http://localhost:5000/graphql";
// }

//Apollo server
const client = new ApolloClient({
  uri: "https://powerful-savannah-37896.herokuapp.com/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
