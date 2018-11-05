import React, { Component } from 'react';
import './App.css';
import {Register} from './components/Register.jsx';
// import {List} from './components/List.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
    const style = {
      'color': 'white',
      'font-weight': 'bold',
      'font-family': 'monospace',
      'font-size': '-webkit-xxx-large',
      'width': '-webkit-fill-available'
    }
    return (
      <div className="App">
        <div className="container">
        <h1 className="my-4 text-uppercase text-light">
        Welcome to Electoral Voting System</h1>
        <hr className="bg-light py-1"/>
        </div>
        <Register/>
        {/* <List/> */}
      </div>
    );
  }
}

export default App;
