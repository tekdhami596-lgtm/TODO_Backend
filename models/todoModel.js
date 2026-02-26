import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";
import User from "./user.model.js";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title cannot be empty" },
      },
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE", // delete todos if user deleted
    },
  },
  {
    timestamps: true,
    tableName: "todos",
    underscored: true,
  },
);

// relations
User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });

export default Todo;
