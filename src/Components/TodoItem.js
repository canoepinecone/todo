import React, { Component } from 'react';

class TodoItem extends Component {
    handleDelete(e) {
        this.props.deleteItem(this.props.index);
        e.preventDefault();
    }

    render() {
        return (
            <li>
                <form onSubmit={this.handleDelete.bind(this)}>
                    <label for="submit">{this.props.item}</label>
                    <input type="submit" value="Delete" />
                </form>
            </li>
        );
    }
}

export default TodoItem;