import asyncHandler from 'express-async-handler';
import { updateIfNotEmpty } from '../lib/helpers.js';
import { Form } from '../models/index.js';

/**
 * @desc   Fetch all todo forms
 * @route  GET /api/todo
 * @access Public
 */
export const getAllTodos = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const paginate = req.query.paginate || 'true';
    const param = req.query.param || '';
    const regOpt = 'gim';
    let keyword = [{}];

    if (req.query.keyword) {
      keyword = [
        { title: { $regex: req.query.keyword, $options: regOpt } },
        { message: { $regex: req.query.keyword, $options: regOpt } },
      ];

      const specificQuery = {};
      if (req.query.param) {
        specificQuery[param] = { $regex: req.query.keyword, $options: regOpt };
        keyword.push({ ...specificQuery });
      }
    }

    let result = { todos: [] };
    if (paginate.toLowerCase() === 'true') {
      const todos = await Form.find({ $or: [...keyword] })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      const count = await Form.countDocuments({ $or: [...keyword] });
      result = { todos, page, pages: Math.ceil(count / pageSize) };
    } else {
      const todos = await Form.find({ $or: [...keyword] });
      result = { todos };
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

/**
 * @desc   Create a new Todo
 * @route  POST /api/todo
 * @access Public
 */
export const addNewTodo = asyncHandler(async (req, res) => {
  try {
    const { title, message } = req.body;
    const todo = new Form({
      title: title.trim(),
      message: message.trim(),
      resolved: false,
    });

    const createdTodo = await todo.save();

    return res.status(201).json({ todo: createdTodo });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

/**
 * @desc   Find a Todo by id
 * @route  GET /api/todo/:id
 * @access Public
 */
export const getTodoById = asyncHandler(async (req, res) => {
  try {
    const todo = await Form.findById(req.params.id);

    if (todo) {
      return res.status(202).json({ todo });
    }

    return res.status(404).json({ err: 'Todo not found' });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

/**
 * @desc   Delete a Todo by id
 * @route  GET /api/todo/:id
 * @access Public
 */
export const deleteTodoById = asyncHandler(async (req, res) => {
  try {
    const todo = await Form.findById(req.params.id);

    if (todo) {
      await todo.remove();
      return res.status(204);
    }

    return res.status(404).json({ err: 'Todo not found' });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

/**
 * @desc   Update a Todo by id
 * @route  POST /api/todo/:id
 * @access Public
 */
export const updateTodoById = asyncHandler(async (req, res) => {
  try {
    const { title, message, resolved } = req.body;
    const todo = await Form.findById(req.params.id);

    if (todo) {
      updateIfNotEmpty(todo, [
        { key: 'title', value: title },
        { key: 'message', value: message },
        { key: 'resolved', value: resolved },
      ]);

      const updatedTodo = await todo.save();
      return res.status(202).json({ todo: updatedTodo });
    }

    return res.status(404).json({ err: 'Todo not found' });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

export default {};
