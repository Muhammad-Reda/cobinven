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
router.get("/", getAllusers);

//Get user by id
router.get("/:id", getUser);

//Create user
router.post("/", register);

//Update user
router.patch("/:id", updateUser);

//Delete user
router.delete("/:id", deleteUser);

export default router;
