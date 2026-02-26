import { Sequelize } from "sequelize";
import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
   
    connectTimeout: 10000,
  },
  
  pool: {
    max: 1, 
    min: 0,
    idle: 0,
    acquire: 10000,
    evict: 1000,
  },
  logging: false,
});

export default sequelize;
