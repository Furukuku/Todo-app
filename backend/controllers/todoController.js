import Todo from "../models/todoModel.js";

/**
 * Gets all the todos
 * @param {object} req - The request object 
 * @param {object} res - The response object
 * @returns {object} - All fetched todos
 */
export const showAll = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId});
    return res.status(200).json({ todos: todos });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch all todos.', error: err });
  }
};

/**
 * Gets an specific todo based on the id
 * @param {object} req - The request object 
 * @param {object} res - The response object
 * @returns {object} - Fetched todo
 */
export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.find({ userId: req.userId, _id: id });

    if (todo.length > 0) {
      return res.status(200).json({ todo: todo[0] });
    }

    return res.status(400).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch todo.', error: err });
  }
};

/**
 * Creates a new todo
 * @param {object} req - The request object 
 * @param {object} res - The response object
 * @returns {object} - The newly created todo
 */
export const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const errors = {};

    if (title.length > 45) {
      errors.title = 'The title must not have greater than 45 characters.';
    }

    if (description.length > 700) {
      errors.description = 'The description must not have greater than 700 characters.';
    }

    if (title.length < 1) {
      errors.title = 'The title is required.';
    }

    if (description.length < 1) {
      errors.description = 'The description is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const todo = await Todo.create({
      title: title,
      description: description,
      userId: req.userId
    });

    if (todo) {
      return res.status(200).json({ todo: todo });
    }

    return res.status(500).json({ message: 'Failed to create todo, please try again.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create todo, please try again.', error: err });
  }
};

/**
 * Updates a todo based on the passed id
 * @param {object} req - The request object 
 * @param {object} res - The response object
 * @returns {object} - The newly updated todo
 */
export const update = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const errors = {};

    if (title.length > 45) {
      errors.title = 'The title must not have greater than 45 characters.';
    }

    if (description.length > 700) {
      errors.description = 'The description must not have greater than 700 characters.';
    }

    if (title.length < 1) {
      errors.title = 'The title is required.';
    }

    if (description.length < 1) {
      errors.description = 'The description is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const todo = await Todo.updateOne({ userId: req.userId, _id: id }, {
      title: title,
      description: description
    });

    if (todo) {
      return res.status(200).json({ todo: todo });
    }

    return res.status(500).json({ message: 'Failed to update todo, please try again.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update todo, please try again.', error: err });
  }
};

/**
 * Delets a todo based on the passed id
 * @param {object} req - The request object 
 * @param {object} res - The response object
 * @returns {object} - The recently deleted todo
 */
export const destroy = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.deleteOne({ userId: req.userId, _id: id });

    if (todo) {
      return res.status(200).json({ todo: todo });
    }

    return res.status(500).json({ message: 'Failed to update todo, please try again.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update todo, please try again.', error: err });
  }
};