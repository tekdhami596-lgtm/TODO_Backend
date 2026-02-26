import express from "express";
import * as TodoController from "../controller/todoController.js";
import { validate } from "../middlewares/validate.js";
import { createTodoSchema } from "../validation/todo.validation.js";
import protectTODO from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(protectTODO, TodoController.getTodosController)
  .post(
    validate(createTodoSchema),
    protectTODO,
    TodoController.createTodoController,
  );

router
  .route("/:id")
  .delete(protectTODO, TodoController.deleteTodoController)
  .put(
    validate(createTodoSchema),
    protectTODO,
    TodoController.updateTodoController,
  );

export default router;
