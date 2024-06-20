import express from "express";
import { login, register } from "../controller/auth.js";
import { accessValidation } from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", accessValidation, register);

export default router;
