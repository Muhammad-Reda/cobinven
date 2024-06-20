import {
    getAllBarangKeluar as getAllBarangKeluarModel,
    getBarangKeluar as getBarangKeluarModel,
    createBarangKeluar as createBarangKeluarModel,
    updateBarangKeluar as updateBarangKeluarModel,
    deleteBarangKeluar as deleteBarangKeluarModel,
    kembalikanStok as kembalikanStokModel,
} from "../models/barang-keluar.js";

import {
    getBarang as getBarangModel,
    kurangStok as kurangStokModel,
} from "../models/barang.js";

export const getAllBarangkeluar = async (req, res) => {
    try {
        const [data] = await getAllBarangKeluarModel();
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

export const getBarangKeluar = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await getBarangKeluarModel(id);

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

export const createNewBarangKeluar = async (req, res) => {
    try {
        const { body } = req;
        const [foundBarang] = await getBarangModel(body.kode_barang);
        if (foundBarang.length <= 0) {
            return res.status(404).json({
                message: "Barang tidak ditemukan, tidak dapat mengurangi stok",
            });
        }

        if (
            foundBarang.length > 0 &&
            (foundBarang[0].stok <= 0 || foundBarang[0].stok <= body.jumlah)
        )
            return res.status(401).json({
                message: "Jumlah melebihi stok yang tersedia",
                data: foundBarang[0],
            });

        await kurangStokModel(body, body.kode_barang);
        await createBarangKeluarModel(body);

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

export const updateBarangKeluar = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const [data] = await getBarangKeluarModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Record tidak ditemukan",
            });
        }

        await updateBarangKeluarModel(body, id);

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

export const deleteBarangKeluar = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await getBarangKeluarModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Record tidak ditemukan",
            });
        }

        await deleteBarangKeluarModel(id);
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
