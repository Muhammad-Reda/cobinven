import {
    getAllBarangKeluar as getAllBarangKeluarModel,
    getBarangKeluar as getBarangKeluarModel,
    createBarangKeluar as createBarangKeluarModel,
    updateBarangKeluar as updateBarangKeluarModel,
    deleteBarangKeluar as deleteBarangKeluarModel,
    kembalikanStok as kembalikanStokModel,
    totalPageData as totalPageDataModel,
} from "../models/barang-keluar.js";

import {
    getBarang as getBarangModel,
    kurangStok as kurangStokModel,
} from "../models/barang.js";

import { format } from "date-fns-tz";

export const getAllBarangkeluar = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 0);
        const limit = parseInt(req.query.limit || 20);
        const search = req.query.search || "";
        const offset = limit * page;
        const [data] = await getAllBarangKeluarModel({
            limit,
            offset,
            search,
        });
        const [totalPageData] = await totalPageDataModel();
        const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

        // Fungsi untuk mengkonversi dan memformat tanggal_masuk
        const convertAndFormatDate = (dateString) => {
            const timeZone = "Asia/Jakarta"; // Ganti dengan zona waktu yang sesuai
            const formattedDate = format(new Date(dateString), "dd MMMM yyyy", {
                timeZone,
            });
            return formattedDate;
        };

        // Memformat tanggal_masuk dalam data
        const formattedData = data.map((item) => {
            return {
                ...item,
                tanggal_keluar: convertAndFormatDate(item.tanggal_keluar),
            };
        });

        res.status(200).json({
            message: "Success",
            data: formattedData, // Menggunakan data yang telah diformat
            pagination: {
                search,
                offset,
                page: +page,
                limit: +limit,
                totalPage,
                rows: totalPageData[0]?.count,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: AllBarangKeluar",
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

        // Fungsi untuk mengkonversi dan memformat tanggal_masuk
        const convertAndFormatDate = (dateString) => {
            const timeZone = "Asia/Jakarta"; // Ganti dengan zona waktu yang sesuai
            const formattedDate = format(new Date(dateString), "dd MMMM yyyy", {
                timeZone,
            });
            return formattedDate;
        };

        // Memformat tanggal_masuk dalam data
        const formattedData = data.map((item) => {
            return {
                ...item,
                tanggal_keluar: convertAndFormatDate(item.tanggal_keluar),
            };
        });

        res.status(200).json({
            message: "Success",
            data: formattedData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: BarangKeluar",
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
            (foundBarang[0].stok <= 0 || foundBarang[0].stok < body.jumlah)
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
            message: "Server mengalami Error: AddBarangKeluar",
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
        await kembalikanStokModel(data[0].jumlah, data[0].kode_barang);
        await kurangStokModel(body, body.kode_barang);
        await updateBarangKeluarModel(body, id);

        res.status(200).json({
            message: "Updated",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami error",
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
            message: "Server mengalami Error: DeleteBarangKeluar",
            error,
        });
    }
};
