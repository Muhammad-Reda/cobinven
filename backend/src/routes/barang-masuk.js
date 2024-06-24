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
router.get("/", getAllBarangMasuk);

//Get barang-masuk by id
router.get("/:id", getBarangMasuk);

//Tambah stok barang
router.post("/stok", createNewBarangMasukStok);

//create new barang masuk and new barang
router.post("/barang", createNewBarangMasukBarang);

//update barang
router.patch("/:id", updateBarangMasuk);

// //Delete barang
router.delete("/:id", deleteBarangMasuk);

export default router;
