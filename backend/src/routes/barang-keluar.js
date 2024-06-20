import express from "express";
import { accessValidation } from "../middleware/validation.js";
import {
    getAllBarangkeluar,
    getBarangKeluar,
    createNewBarangKeluar,
    updateBarangKeluar,
    deleteBarangKeluar,
} from "../controller/barang-keluar.js";

const router = express.Router();

//GET all barang
router.get("/", accessValidation, getAllBarangkeluar);

//Get barang by kode
router.get("/:id", accessValidation, getBarangKeluar);

//Create new barang
router.post("/", accessValidation, createNewBarangKeluar);

//update barang
router.patch("/:id", accessValidation, updateBarangKeluar);

//Delete barang
router.delete("/:id", accessValidation, deleteBarangKeluar);

export default router;
