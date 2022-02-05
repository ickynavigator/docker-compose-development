import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';

const index = () => (
    <div className={styles.container}>
      <Head>
        <title>List of all todos</title>
        <meta name="description" content="List of Todos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>All Todos</h1>
      </main>

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

export default index;
