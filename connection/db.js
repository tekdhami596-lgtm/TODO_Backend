import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Essential for Neon/Vercel environments
    },
  },
  logging: false, // Optional: set to console.log to see SQL queries
});

export default sequelize;
