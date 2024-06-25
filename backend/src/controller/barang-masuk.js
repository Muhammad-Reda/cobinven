import {
    getAllBarangMasuk as getAllBarangMasukModel,
    getBarangMasuk as getBarangMasukModel,
    createBarangMasuk as createBarangMasukModel,
    updateBarangMasuk as updateBarangMasukModel,
    deleteBarangMasuk as deleteBarangMasukModel,
    kembalikanStok as kembalikanStokModel,
    totalPageData as totalPageDataModel,
} from "../models/barang-masuk.js";

import {
    getBarang as getBarangModel,
    tambahStok as tambahStokModel,
    kurangStok as kurangStokModel,
    createNewBarangMasuk as createNewBarangModel,
} from "../models/barang.js";

import { format } from "date-fns-tz";

export const getAllBarangMasuk = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 0);
        const limit = parseInt(req.query.limit || 20);
        const search = req.query.search || "";
        const offset = limit * page;
        const [data] = await getAllBarangMasukModel({
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
                tanggal_masuk: convertAndFormatDate(item.tanggal_masuk),
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
            message: "Server mengalami Error: AllBarangMasuk",
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
                tanggal_masuk: convertAndFormatDate(item.tanggal_masuk),
            };
        });

        res.status(200).json({
            message: "Success",
            data: formattedData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: BarangMasuk",
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
            message: "Server mengalami Error: AddBarangMasukStok",
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
            message: "Server mengalami Error: AddBarangMasukBarang",
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
        await kembalikanStokModel(data[0].jumlah, data[0].kode_barang);
        await tambahStokModel(body, body.kode_barang);
        await updateBarangMasukModel(body, id);

        res.status(200).json({
            message: "Updated",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: UpdateBarangMasuk",
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
            message: "Server mengalami Error: DeleteBarangMasuk",
            error,
        });
    }
};
