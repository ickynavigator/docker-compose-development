import 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectMONGO } from './db/conn.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const VERSION_NUMBER = process.env.VERSION || 'v1';
const ENV = process.env.NODE_ENV || 'development';

connectMONGO();
const app = express();

if (ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running.....');
});

app.listen(
  PORT,
  console.log(
    `\nServer running in ${ENV} mode on port ${PORT} -> http://localhost:${PORT}/${VERSION_NUMBER}/api`
      .yellow.bold,
  ),
);
