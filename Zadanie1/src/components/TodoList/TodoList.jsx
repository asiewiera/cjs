import React from 'react';
import styles from "./TodoList.module.css"

const TodoList = (props) => {
  if (!Array.isArray(props.todoList) || props.todoList.length === 0) {
    return null;
  }

  return (

  <ul id="todoList" className={styles.list}>
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
