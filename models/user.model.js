import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

export default User;
