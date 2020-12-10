import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Rest', completed: false },
  { id: 'todo-2', name: 'Sleep', completed: false },
];

ReactDOM.render(<App />, document.getElementById('root'));