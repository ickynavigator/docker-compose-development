import asyncHandler from 'express-async-handler';
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

    const todos = await Form.find({ $or: [...keyword] })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const count = await Form.countDocuments({ $or: [...keyword] });
    const result = { todos, page, pages: Math.ceil(count / pageSize) };

    return res.status(202).json(result);
  } catch (err) {
    return res.status(404).json({ err });
  }
});

export default {};
