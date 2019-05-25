import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component{
  state = {
    todos: []
  }

  componentDidMount() {
    let url = "https://jsonplaceholder.typicode.com/todos?_limit=10";
    axios.get(url)
      .then(response =>{
        this.setState({ todos: response.data})
    })
  }
  // toggle complete
  markComplete = (id) =>{
    this.setState({ todos: this.state.todos.map(todo=>{
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }
  // delete todo
  delTodo = (id) => {
    let url = "https://jsonplaceholder.typicode.com/todos";
    axios.delete(`${url}/${id}`)
      .then(response =>{
        this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id) ]})
      })
  }

  // add todo
  addTodo = (title) => {
    let url = "https://jsonplaceholder.typicode.com/todos";
    let params = {
      title,
      completed: false
    }
    axios.post(url, params)
      .then(response => {
        console.log('response add', response)
        // set the state to add new data
        this.setState({ todos: [...this.state.todos, response.data]})
      }).catch( err => {
        console.log('error');
      });
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos 
                  todos={this.state.todos} 
                  delTodo={this.delTodo}
                  markComplete={this.markComplete} />
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;