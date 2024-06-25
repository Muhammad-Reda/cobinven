import {
    getAllBarang as getAllBarangModel,
    getBarang as getBarangModel,
    createNewBarang as createNewBarangModel,
    updateBarang as updateBarangModel,
    deleteBarang as deleteBarangModel,
    totalPageData as totalPageDataModel,
    dataDashboard as dataDashboardModel,
    getKodeBarang as getKodeBarangModel,
} from "../models/barang.js";

import { format } from "date-fns-tz";

export const getAllBarang = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 0);
        const limit = parseInt(req.query.limit || 20);
        const search = req.query.search || "";
        const offset = limit * page;
        const [data] = await getAllBarangModel({
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
                tanggal: convertAndFormatDate(item.createdAt),
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
            message: "Server mengalami Error:Baranag",
            error,
        });
    }
};

export const getBarang = async (req, res) => {
    try {
        const { kode } = req.params;
        const [data] = await getBarangModel(kode);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Barang tidak ditemukan",
            });
        }

        res.status(200).json({
            message: "Success",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: GetBarang",
            error,
        });
    }
};

export const getKodeBarang = async (req, res) => {
    try {
        const [data] = await getKodeBarangModel();

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Kode tidak ditemukan",
            });
        }

        res.status(200).json({
            message: "Success",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: GetKodeBarang",
            error,
        });
    }
};

export const createNewBarang = async (req, res) => {
    try {
        const { body } = req;
        const [data] = await getBarangModel(body.kode);
        if (data.length > 0) {
            return res.status(409).json({
                message: "Barang sudah ada silahkan tambah stok",
                data,
            });
        }

        await createNewBarangModel(body);

        res.status(200).json({
            message: "Created",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: AddBarang",
            error: error,
        });
    }
};

export const updateBarang = async (req, res) => {
    try {
        const { body } = req;
        const { kode } = req.params;
        const [data] = await getBarangModel(kode);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Barang tidak ditemukan",
            });
        }

        await updateBarangModel(body, kode);

        res.status(200).json({
            message: "Updated",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: UpdateBarang",
            error,
        });
    }
};

export const deleteBarang = async (req, res) => {
    try {
        const { kode } = req.params;
        const [data] = await getBarangModel(kode);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Barang tidak ditemukan",
            });
        }

        await deleteBarangModel(kode);

        res.status(200).json({
            message: "Deleted",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: DeleteBarang",
            error,
        });
    }
};

export const getDataDashboard = async (req, res) => {
    try {
        const [data] = await dataDashboardModel();
        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: Dashboard",
            error,
        });
    }
};
