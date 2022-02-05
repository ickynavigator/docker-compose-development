import express from 'express';
import {
  addNewTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  toggleTodoById,
  updateTodoById,
} from '../controllers/Todo.controller.js';

const router = express.Router();

router.route('/').get(getAllTodos).post(addNewTodo);
router
  .route('/:id')
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById);
router.route('/:id/toggle').put(toggleTodoById);

export default router;
