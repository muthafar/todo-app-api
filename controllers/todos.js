const Todo = require("../models/todo");

module.exports.listTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });

  return res.json(todos);
};

module.exports.createTodo = async (req, res) => {
  const { content } = req.body;
  const todo = new Todo({ content });
  todo.user = req.user._id;
  await todo.save();
  res.status(201).json(todo);
};

module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { isDone });
  res.json(todo);
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  res.json(todo);
};
