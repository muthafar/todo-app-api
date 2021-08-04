const express = require("express");
const router = express.Router();
const todos = require("../controllers/todos");
const { isLoggedIn } = require("../middleWares");
const catchAsync = require("../helpers/catchAsync");

router
  .route("/")
  .get(isLoggedIn, catchAsync(todos.listTodos))
  .post(isLoggedIn, catchAsync(todos.createTodo));

router
  .route("/:id")
  .put(isLoggedIn, catchAsync(todos.updateTodo))
  .delete(isLoggedIn, catchAsync(todos.deleteTodo));

module.exports = router;
