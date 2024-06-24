import express from "express";
import { login, register, logout } from "../controller/auth.js";
import { accessValidation } from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", accessValidation, register);
router.delete("/logout", logout);

export default router;
