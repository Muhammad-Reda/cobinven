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
router.get("/", getAllBarangkeluar);

//Get barang by kode
router.get("/:id", getBarangKeluar);

//Create new barang
router.post("/", createNewBarangKeluar);

//update barang
router.patch("/:id", updateBarangKeluar);

//Delete barang
router.delete("/:id", deleteBarangKeluar);

export default router;
