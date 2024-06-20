import express from "express";
import { accessValidation } from "../middleware/validation.js";

import {
    getAllBarangMasuk,
    getBarangMasuk,
    createNewBarangMasukStok,
    createNewBarangMasukBarang,
    updateBarangMasuk,
    deleteBarangMasuk,
} from "../controller/barang-masuk.js";

const router = express.Router();

//GET all barang-masuk
router.get("/", accessValidation, getAllBarangMasuk);

//Get barang-masuk by id
router.get("/:id", accessValidation, getBarangMasuk);

//Tambah stok barang
router.post("/stok", accessValidation, createNewBarangMasukStok);

//create new barang masuk and new barang
router.post("/barang", accessValidation, createNewBarangMasukBarang);

//update barang
router.patch("/:id", accessValidation, updateBarangMasuk);

// //Delete barang
router.delete("/:id", accessValidation, deleteBarangMasuk);

export default router;
