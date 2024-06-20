import {
    getAllUsers as getAllUsersModel,
    getUser as getUserModel,
    createUser as createUserModel,
    updateUser as updateUserModel,
    deleteUser as deleteUserModel,
} from "../models/users.js";
import bcrypt from "bcrypt";

export const getAllusers = async (req, res) => {
    try {
        const [data] = await getAllUsersModel();
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

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [data] = await getUserModel(id);

        if (data.length <= 0)
            return res.status(404).json({
                message: "AKun tidak ditemukan",
            });

        res.status(200).json({
            message: "Success",
            data: {
                id: data[0].id,
                username: data[0].username,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error: error,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { id } = req.params;
        const [data] = await getUserModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Akun tidak ditemukan",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await updateUserModel(username, hashedPassword, id);

        res.status(200).json({
            message: "Updated",
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [data] = await getUserModel(id);

        if (data.length <= 0) {
            return res.status(404).json({
                message: "Akun tidak ditemukan",
            });
        }

        await deleteUserModel(id);

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
