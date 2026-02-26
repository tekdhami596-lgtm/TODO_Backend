import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import sequelize from "./connection/db.js";
import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

const checkConnectionDB = async () => {
  try {
    // test database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("Database synchronized");

    // start server
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

checkConnectionDB();
