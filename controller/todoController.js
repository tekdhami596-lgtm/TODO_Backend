import * as TodoService from "../services/todoService.js";

export const getTodosController = async (req, res) => {
  try {
    const todos = await TodoService.getTodos(req.user.id);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTodoController = async (req, res) => {
  try {
    console.log("req.user :", req.user);

    const { title } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const todo = await TodoService.createTodo(req.user.id, title);

    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTodoController = async (req, res) => {

  try {
    const todo = await TodoService.updateTodo(
      req.params.id,
      req.user.id,
      req.body,
    );
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    const userId = req.user.id;

    await TodoService.deleteTodo(id, userId);

    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
