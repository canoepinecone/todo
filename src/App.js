import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import AddTodo from './Components/AddTodo';
import LoginForm from './Components/LoginForm';
import $ from 'jquery';
import Cookies from 'universal-cookie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      login: "nothing"
    };
    this.cookies = new Cookies();
  }

  componentDidMount() {
    this.setState({todos: [], user: '', userkey: ''});
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

  handleLogin(username, password) {
    this.setState({
      todos: this.state.todos,
      login: username + ':' + password
    });
    this.sendState();
  }

  sendState() {
    $.ajax('http://localhost:5000/', {
      method: 'POST',
      data: this.state
    });
  }
  getState() {
    $.ajax('http://localhost:5000/', {
      success: function(data) {
        this.setState(data);
      }
    });
  }

  render() {
    if (this.state.login !== 'nothing') {
      return (
        <div>
          <AddTodo addTodo={this.addTodo.bind(this)} />
          <TodoList todos={this.state.todos} deleteItem={this.deleteItem.bind(this)} />
        </div>
      );
    } else {
      return (
        <div>
          <LoginForm handleLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }
  }
}

export default App;
