import React, { useState } from 'react';
import styles from '../../styles/todocard.module.css';
import { deleteTodo, toggleTodo } from '../api';

const index = ({ todo }) => {
  const {
    _id: id, title, message, resolved,
  } = todo;
  const [isResolved, setIsResolved] = useState(resolved);
  const [isDeleted, setIsDeleted] = useState(false);

  const style = {
    borderColor: isResolved ? 'green' : 'red',
  };
  const spanStyle = {
    color: isResolved ? 'green' : 'red',
  };

  const toggleHandler = async () => {
    const res = await toggleTodo(id);
    if (res.todo) setIsResolved(res.todo.resolved);
  };

  const deleteHandler = () => {
    deleteTodo(id);
    setIsDeleted(true);
  };

  return (
    !isDeleted && (
      <div className={styles.card} style={style}>
        <div className={styles.cardBody}>
          <h2>{title}</h2>

          <p>{message}</p>
          <span style={spanStyle}>{isResolved ? 'Done' : 'Not Completed'}</span>
        </div>

        <div className={styles.sidebar}>
          <div>
            <button onClick={toggleHandler}>Toggle Status</button>
          </div>
          <div>
            <button onClick={deleteHandler} className={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default index;
