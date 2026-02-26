import express from "express";
import { getAllUsers } from "../controller/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers)

export default router

