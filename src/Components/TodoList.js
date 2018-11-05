import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    
    render() {
        var deleteItem = this.props.deleteItem;

        var listItems = this.props.todos.map(function (item, index) {
            return (
                <TodoItem deleteItem={deleteItem} index={index} item={item} />
            );
        });
        return (
            <ul>{listItems}</ul>
        );
    }
}

export default TodoList;