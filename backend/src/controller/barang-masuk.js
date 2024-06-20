import {
    getAllBarangMasuk as getAllBarangMasukModel,
    getBarangMasuk as getBarangMasukModel,
    createBarangMasuk as createBarangMasukModel,
    updateBarangMasuk as updateBarangMasukModel,
    deleteBarangMasuk as deleteBarangMasukModel,
    kembalikanStok as kembalikanStokModel,
} from "../models/barang-masuk.js";

import {
    getBarang as getBarangModel,
    tambahStok as tambahStokModel,
    createNewBarangMasuk as createNewBarangModel,
} from "../models/barang.js";

export const getAllBarangMasuk = async (req, res) => {
    try {
        const [data] = await getAllBarangMasukModel();
        res.status(200).json({
            message: "Success",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};

export const getBarangMasuk = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await getBarangMasukModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Catatan tidak ditemukan",
            });
        }

        res.status(200).json({
            message: "Success",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};

export const createNewBarangMasukStok = async (req, res) => {
    try {
        const { body } = req;
        const [foundBarang] = await getBarangModel(body.kode_barang);
        if (foundBarang.length <= 0) {
            return res.status(404).json({
                message: "Barang tidak ditemukan, tidak dapat menambahkan stok",
            });
        }

        await tambahStokModel(body, body.kode_barang);
        await createBarangMasukModel(body);

        res.status(200).json({
            message: "Success",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error: error,
        });
    }
};

export const createNewBarangMasukBarang = async (req, res) => {
    try {
        const { body } = req;
        const [foundBarang] = await getBarangModel(body.kode_barang);
        if (foundBarang.length > 0) {
            return res.status(404).json({
                message: "Barang sudah tercatat, silahkan tambah stok",
            });
        }

        await createNewBarangModel(body);
        await createBarangMasukModel(body);

        res.status(200).json({
            message: "Created",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error: error,
        });
    }
};

export const updateBarangMasuk = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const [data] = await getBarangMasukModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Record tidak ditemukan",
            });
        }

        await updateBarangMasukModel(body, id);

        res.status(200).json({
            message: "Updated",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};

export const deleteBarangMasuk = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await getBarangMasukModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Record tidak ditemukan",
            });
        }

        await deleteBarangMasukModel(id);
        await kembalikanStokModel(data[0].jumlah, data[0].kode_barang);
        res.status(200).json({
            message: "Deleted",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};
