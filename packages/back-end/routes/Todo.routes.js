import express from 'express';
import {
  addNewTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from '../controllers/Todo.controller.js';

const router = express.Router();

router.route('/').get(getAllTodos).post(addNewTodo);
router
  .route('/:id')
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById);

export default router;
