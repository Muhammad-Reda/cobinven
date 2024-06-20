import {
    getUserByUsername,
    register as registerModel,
} from "../models/auth.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { body } = req;

        const [foundUser] = await getUserByUsername(body.username);
        if (foundUser.length <= 0)
            return res.status(404).json({
                message: "Akun tidak ditemukan",
            });

        const match = await bcrypt.compare(
            body.password,
            foundUser[0].password
        );

        if (!match)
            return res.status(401).json({
                message: "Username atau password salah",
            });

        const payload = {
            id: foundUser[0].id,
            username: foundUser[0].username,
        };

        const secret = process.env.JWT_SECRET;

        const expiresIn = 60 * 60 * 1;

        const token = jwt.sign(payload, secret, { expiresIn });

        res.status(200).json({
            message: "Success",
            data: {
                id: foundUser[0].id,
                username: foundUser[0].username,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [foundUser] = await getUserByUsername(username);
        if (foundUser.length > 0)
            return res.status(404).json({
                message: "Akun sudah ada",
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        await registerModel(username, hashedPassword);

        res.status(200).json({
            message: "Success",
            data: username,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi error",
            error,
        });
    }
};
