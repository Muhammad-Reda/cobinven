import {
    getAllBarang as getAllBarangModel,
    getBarang as getBarangModel,
    createNewBarang as createNewBarangModel,
    updateBarang as updateBarangModel,
} from "../models/barang.js";

export const getAllBarang = async (req, res) => {
    try {
        const [data] = await getAllBarangModel();
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

export const getBarang = async (req, res) => {
    try {
        const { kode } = req.params;
        const [data] = await getBarangModel(kode);

        if (data === null || undefined || data.length <= 0) {
            res.status(404).json({
                message: "Barang tidak ditemukan",
            });
            return;
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

export const createNewBarang = async (req, res) => {
    try {
        const { body } = req;
        const [data] = await getBarangModel(body.kode);
        if (data.length != 0)
            return res.status(500).json({
                message: "Barang sudah ada",
            });

        await createNewBarangModel(body);

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

export const updateBarang = async (req, res) => {
    try {
        const { body } = req;
        const { kode } = req.params;
        const [data] = await getBarangModel(kode);

        if (data === null || undefined || data.length <= 0) {
            res.status(404).json({
                message: "Barang tidak ditemukan",
            });
            return;
        }

        await updateBarangModel(body, kode);

        res.status(200).json({
            message: "Updated",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};
