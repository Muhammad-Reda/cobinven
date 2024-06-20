import express from "express";
import { accessValidation } from "../middleware/validation.js";

import {
    getAllBarang,
    getBarang,
    createNewBarang,
    updateBarang,
    deleteBarang,
} from "../controller/barang.js";

const router = express.Router();

//GET all barang
router.get("/", accessValidation, getAllBarang);

//Get barang by kode
router.get("/:kode", accessValidation, getBarang);

//Create new barang
router.post("/", accessValidation, createNewBarang);

//update barang
router.patch("/:kode", accessValidation, updateBarang);

//Delete barang
router.delete("/:kode", accessValidation, deleteBarang);

export default router;
