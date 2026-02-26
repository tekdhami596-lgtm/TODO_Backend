import TodoModel from "../models/todoModel.js";

export const getTodos = async (userId) => {
  return await TodoModel.findAll({ where: { userId } });
};

export const getTodoById = async (id, userId) => {
  const todo = await TodoModel.findOne({
    where: { id, userId },
  });

  if (!todo) throw new Error("Todo not found");
  return todo;
};

export const createTodo = async (userId,title) => {
  if (!title) throw new Error("Title is required");

  return await TodoModel.create({title, userId });
};

export const deleteTodo = async (id, userId) => {
  console.log(userId);
  const todo = await TodoModel.findOne({
    where: { id, userId },
  });

  if (!todo) throw new Error("Todo not found");

  await todo.destroy();
  return true;
};

export const updateTodo = async (id, userId, data) => {

  const [updated] = await TodoModel.update(data, {
    where: { id, userId },
  });
  console.log("updated", updated);

  if (!updated) throw new Error("Todo not found");

  return await TodoModel.findOne({ where: { id, userId } });
};
