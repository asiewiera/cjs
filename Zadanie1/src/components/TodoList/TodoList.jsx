import React from 'react';

const TodoList = (props) => (

  <ul id="todoList">
  {console.log(props)}
  {
    props.todoList.map((todo, index) => (
      <li key={index}>{todo.name}</li>
    ))
  }
  </ul>

);

// walidacja propsów

export default TodoList;
