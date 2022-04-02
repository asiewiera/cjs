import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from '../TodoList/TodoList.jsx';

import styles from './App.module.css';

const TODO_ARRAY = [
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
  const [todos, setTodos] = useState(TODO_ARRAY);
  // const [errorMessage, setErrorMessage] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    const initTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
    console.log(initTodos);
    setTodos(initTodos);
    console.log('Run only on start');
  }, []);

  const saveTodos = (inTodos) => {
    setTodos(inTodos);
    localStorage.setItem('todos', JSON.stringify(inTodos));
  };

  const handleTaskFinished = (id) => {
    const index = todos.findIndex((todo) => (todo.id === id));
    const newTodos = [...todos];
    console.log('check', index);
    newTodos[index].checked = !newTodos[index].checked;
    saveTodos(newTodos);
  };

  const handleRemove = (id) => {
    const filteredTodos = todos.filter((todo) => (todo.id !== id));
    saveTodos(filteredTodos);
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
    // setErrorMessage('');
    setIsErrorMessage(false);
  };
  // console.log(inputValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length < 3) {
      // setErrorMessage('Todo item is too short');
      setIsErrorMessage(true);
      return;
      // alert('Todo item is too short');
    }

    // const newTodos = todos.concat(
    //   {
    //     name: inputValue,
    //     checked: false
    //   }
    // )

    const newTodos = [
      ...todos,
      {
        id: uuidv4(),
        name: inputValue,
        checked: false,
      },
    ];

    saveTodos(newTodos);

    // czyszczenie formularza
    setInputValue('');
  };

  return (<div>
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Write todo' value={inputValue} onChange={handleOnChange}/>
    {isErrorMessage ? <p className={styles.error} id='error' >Text is too short. Length is below 3</p> : null}
    <button type='submit'>send todo</button>
  </form>
  <TodoList todoList = {todos} onRemove = {handleRemove} onFinish= {handleTaskFinished}/>
</div>);
};

export default App;
