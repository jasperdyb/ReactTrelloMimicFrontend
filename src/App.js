import React from "react";
import "./App.css";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          name: "todo1",
          finished: false,
        },
        {
          name: "todo2",
          finished: false,
        },
        {
          name: "todo3",
          finished: false,
        },
      ],
    };
  }

  render() {
    return pug`
      .d-flex.justify-content-center
        .card.todo-list
          .card-header
            h5.card-title Todo

          .card-body.p-2
            .row.row-cols-1
              for todo in this.state.todos
                .col.py-1
                  a.btn.d-flex.todo-item(href="#") #{todo.name}

          .card-footer
            a.btn.btn-light(href="#") + Add todo
      `;
  }
}

const App = () => pug`
  TodoList
  `;

export default App;
