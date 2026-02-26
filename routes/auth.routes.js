import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import {
  loginController,
  logoutController,
  registerController,
} from "../controller/auth.controller.js";

const router = express.Router();

// Register route
router.post("/register", validate(registerSchema), registerController);

// Login route
router.post("/login", validate(loginSchema), loginController);

// logout route
router.post("/logout", logoutController);




export default router;
