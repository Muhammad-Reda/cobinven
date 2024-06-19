import express from "express";

import {
    getAllBarang,
    getBarang,
    createNewBarang,
    updateBarang,
} from "../controller/barang.js";

const router = express.Router();

//GET all barang
router.get("/", getAllBarang);

//Get barang by kode
router.get("/:kode", getBarang);

//Create new barang
router.post("/", createNewBarang);

//update barang
router.patch("/:kode", updateBarang);

export default router;
