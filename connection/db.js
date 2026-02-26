import { Sequelize } from "sequelize";
import * as pg from "pg"; // 1. Import everything from pg
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, // 2. THIS IS THE CRITICAL FIX FOR VERCEL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;
