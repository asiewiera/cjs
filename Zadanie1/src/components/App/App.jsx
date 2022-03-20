import React, { useState } from 'react';
import TodoList from '../TodoList/TodoList.jsx';

const todos = [
  {
    name: 'Wynieść śmieci',
    checked: false,
  },

  {
    name: 'Wyprowadź psa',
    checked: true,
  },
];

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };
  console.log(inputValue);

  const validate = (event) => {
    event.preventDefault();
    if (inputValue.length < 3) {
      alert('Todo item is too short');
    }
  };

  return (<div>
  <h1>Todo List</h1>
  <form onSubmit={validate}>
    <input type='text' placeholder='Write todo' onChange={handleOnChange}/>
    <button type='submit'>send todo</button>
  </form>
  <TodoList todoList = {todos}/>
</div>);
};

export default App;
