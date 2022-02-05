import Head from 'next/head';
import React, { useState } from 'react';
import { RiAddCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import Modal from 'react-modal';
import { createNewTodo, getAllTodos } from '../lib/api/index.js';
import TodoCard from '../lib/components/TodoCard.jsx';
import styles from '../styles/Home.module.css';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#__next');

export async function getServerSideProps(context) {
  const pageSize = 10;
  const pageNum = context.query.p || 1;

  const data = await getAllTodos(pageNum, pageSize);

  if (!data) return { notFound: true };
  return { props: { ...data } };
}

const index = (props) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalError, setmodalError] = useState('');

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState(props.todos);

  const openModal = () => {
    setmodalOpen(true);
    setmodalError('');
  };

  const afterOpenModal = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length > 0 && message.trim().length > 0) {
      const newTodo = {
        title: title.trim(),
        message: message.trim(),
      };

      const data = await createNewTodo(newTodo);
      setmodalOpen(false);
      if (data.todo) {
        setTodos([...todos, data.todo]);
      } else {
        setmodalError('The todo did not save. Please try again.');
      }
    } else {
      setmodalError('ALL FIELDS ARE REQUIRED.');
    }
  };

  const closeModal = () => {
    setmodalOpen(false);
    setmodalError('');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>List of all todos</title>
        <meta name="description" content="List of Todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          All Todos{' '}
          <button className={styles.addTodoButton} onClick={openModal}>
            <RiAddCircleLine />
          </button>
        </h1>

        <div className={styles.grid}>
          {todos.map((todo) => {
            const { _id: id } = todo;
            return <TodoCard todo={todo} key={id} />;
          })}
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyles}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalTitlebar}>
            <h2>Add a new Todo</h2>
            <button onClick={closeModal}>
              <RiCloseCircleLine />
            </button>
          </div>

          {modalError && (
            <div className={`${styles.alert} ${styles.alertDanger}`}>
              <p>{modalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Title">Title:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="Title"
                      name="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Message">Message:</label>
                  </td>
                  <td>
                    <textarea
                      name="Message"
                      id="Message"
                      cols="20"
                      rows="10"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={styles.submitDiv}>
              <input type="submit" value="Add Todo" />
            </div>
          </form>
        </div>
      </Modal>

      <footer className={styles.footer}>
        <a
          href="https://obifortune.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Obi Fortune
        </a>
      </footer>
    </div>
  );
};

export default index;
