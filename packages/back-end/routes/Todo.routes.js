import express from 'express';
import { getAllTodos } from '../controllers/Todo.controller.js';

const router = express.Router();

router.route('/').get(getAllTodos);

export default router;
