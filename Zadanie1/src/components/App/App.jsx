import React, { useState, useEffect } from 'react';
import TodoList from '../TodoList/TodoList.jsx';

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

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
    // setErrorMessage('');
    setIsErrorMessage(false);
  };
  // console.log(inputValue);

  const validate = (event) => {
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
        name: inputValue,
        checked: false,
      },
    ];
    setTodos(newTodos);

    localStorage.setItem('todos', JSON.stringify(newTodos));

    // czyszczenie formularza
    setInputValue('');
  };

  return (<div>
  <h1>Todo List</h1>
  <form onSubmit={validate}>
    <input type='text' placeholder='Write todo' value={inputValue} onChange={handleOnChange}/>
    {isErrorMessage ? <p style={{ color: 'red' }} id='error' >Text is too short. Length is below 3</p> : null}
    <button type='submit'>send todo</button>
  </form>
  <TodoList todoList = {todos}/>
</div>);
};

export default App;
