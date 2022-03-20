import React from 'react';

const TodoList = (props) => {
  if (!Array.isArray(props.todoList) || props.todoList.length === 0) {
    return null;
  }

  return (

  <ul id="todoList">
  {console.log(props)}
  {
    props.todoList.map((todo, index) => (
      <li key={index}>{todo.name}</li>
    ))
  }
  </ul>

  );
};

// walidacja propsów

export default TodoList;
