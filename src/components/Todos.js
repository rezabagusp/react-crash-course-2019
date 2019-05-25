import React, { Component } from 'react';
import TodoItem from './TodoItem';

// component for prop validation that recieved from other commponennt
import PropTypes from 'prop-types';

class Todos extends Component {
  // // method to handle event emitted (kindda) by child
  // markComplete = () =>{
  //   console.log('hello');
  // }

  render() {
    return this.props.todos.map((todo)=>(
      <TodoItem 
        key={ todo.id } todo={ todo } 
        delTodo={this.props.delTodo}
        markComplete={this.props.markComplete} />
    ));
  } 
}

// define prop types that will be have and only in Todos component
Todos.propTypes = {
  todos: PropTypes.array.isRequired, // validate prop 'todos' which is object and required
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}

export default Todos;

