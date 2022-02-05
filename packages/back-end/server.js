import 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectMONGO } from './db/conn.js';
import routes from './routes/index.js';

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

app.use(`/api/${VERSION_NUMBER}`, routes);

app.listen(
  PORT,
  console.log(
    `\nServer running in ${ENV} mode on port ${PORT} -> http://localhost:${PORT}/api/${VERSION_NUMBER}`
      .yellow.bold,
  ),
);
