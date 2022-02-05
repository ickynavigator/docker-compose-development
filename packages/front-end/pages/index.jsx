import Head from 'next/head';
import React, { useState } from 'react';
import { RiAddCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import Modal from 'react-modal';
import { getAllTodos } from '../lib/api/index.js';
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
  const { todos } = props;

  const [modalOpen, setmodalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const openModal = () => {
    setmodalOpen(true);
  };

  const afterOpenModal = () => {};

  const handleSubmit = () => {};

  const closeModal = () => {
    setmodalOpen(false);
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
          {todos.map((todo) => (
            <TodoCard todo={todo} key={todo.id} />
          ))}
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

          <form onSubmit={handleSubmit} method="POST">
            <table>
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
