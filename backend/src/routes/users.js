import express from "express";
import { accessValidation } from "../middleware/validation.js";
import {
    getAllusers,
    getUser,
    updateUser,
    deleteUser,
} from "../controller/users.js";

import { register } from "../controller/auth.js";
const router = express.Router();

// Get all users
router.get("/", accessValidation, getAllusers);

//Get user by id
router.get("/:id", accessValidation, getUser);

//Create user
router.post("/", accessValidation, register);

//Update user
router.patch("/:id", accessValidation, updateUser);

//Delete user
router.delete("/:id", accessValidation, deleteUser);

export default router;
