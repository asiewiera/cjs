import React from 'react';
import styles from './TodoList.module.css';

const TodoList = (props) => {
  if (!Array.isArray(props.todoList) || props.todoList.length === 0) {
    return null;
  }

  return (

  <ul id="todoList" className={styles.myList}>
  {
    props.todoList.map((todo) => (
      <li
        key={todo.id}
      >
        <input
          type='checkbox'
          // value={todo.checked}
          checked = {todo.checked}
          onChange = {() => props.onFinish(todo.id)}
        />
        {console.log(todo.checked ? styles.completed : '')}
        <span className= {todo.checked ? styles.completed : ''}>{todo.name}</span>
        <button onClick={() => props.onRemove(todo.id)}>X</button>
      </li>
    ))
  }
  </ul>

  );
};

// walidacja propsów

export default TodoList;
