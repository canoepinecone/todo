import React, { Component } from 'react';

class AddTodo extends Component {
    
    handleSubmit(e) {
        this.props.addTodo(document.getElementById("item").value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label for="item">Item</label>
                <input type="text" id="item" />
                <input type="submit" />
            </form>
        );
    }
}

export default AddTodo;