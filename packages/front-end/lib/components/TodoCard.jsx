import React, { useState } from 'react';
import styles from '../../styles/todocard.module.css';

const index = ({ todo }) => {
  const { title, message, resolved } = todo;
  const [isResolved, setIsResolved] = useState(resolved);
  const [isDeleted, setIsDeleted] = useState(false);

  const style = {
    borderColor: isResolved ? 'green' : 'red',
  };
  const spanStyle = {
    color: isResolved ? 'green' : 'red',
  };
  const toggleResolved = () => {
    setIsResolved(!isResolved);
  };
  const deleteTodo = () => {
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
            <button onClick={toggleResolved}>Resolve</button>
          </div>
          <div>
            <button onClick={deleteTodo} className={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default index;
