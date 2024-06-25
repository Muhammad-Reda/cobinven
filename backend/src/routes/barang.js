import express from "express";
import { accessValidation } from "../middleware/validation.js";

import {
    getAllBarang,
    getBarang,
    createNewBarang,
    updateBarang,
    deleteBarang,
    getKodeBarang,
} from "../controller/barang.js";

const router = express.Router();

//GET all barang
router.get("/", getAllBarang);

//Get barang by kode
router.get("/:kode", getBarang);

//Get kode barang
router.get("/kode/kode-barang", getKodeBarang);

//Create new barang
router.post("/", createNewBarang);

//update barang
router.patch("/:kode", updateBarang);

//Delete barang
router.delete("/:kode", deleteBarang);

export default router;
