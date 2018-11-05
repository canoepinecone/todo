import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import AddTodo from './Components/AddTodo';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    this.setState({
      todos: [
        "Starting todo"
      ]
    });
    this.sendState();
  }

  addTodo(item) {
    this.setState({
      todos: this.state.todos.concat([item])
    });
    this.sendState();
  }

  deleteItem(index) {
    var todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({
      todos: todos
    });
    this.sendState();
  }

  sendState() {
    $.ajax('http://localhost:5000/todos', {
      method: 'POST',
      data: this.state
    });
  }
  getState() {
    $.ajax('http://localhost:5000/todos', {
      success: function(data) {
        this.setState(data);
      }
    });
  }

  render() {
    this.getState();
    return (
      <div>
        <AddTodo addTodo={this.addTodo.bind(this)} />
        <TodoList todos={this.state.todos} deleteItem={this.deleteItem.bind(this)} />
      </div>
    );
  }
}

export default App;
