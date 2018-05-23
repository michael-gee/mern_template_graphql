import React from 'react';

const ToDoList = props => {
  return (
    <ul>
      {props.todos.map(todo => {
        return <li key={todo._id}>{todo.item}</li>
      })}
    </ul>
  );
};

export default ToDoList;