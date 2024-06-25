import {
    getUserByUsername,
    register as registerModel,
    updateToken,
    nullToken,
    findRefToken,
    getUserById,
} from "../models/auth.js";

import { jwtDecode } from "jwt-decode";

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

        const accessSecret = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        const accessToken = jwt.sign(payload, accessSecret, {
            expiresIn: "15s",
        });
        const refreshToken = jwt.sign(payload, refreshSecret, {
            expiresIn: "1d",
        });

        await updateToken(refreshToken, foundUser[0].id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Success",
            data: {
                id: foundUser[0].id,
                username: foundUser[0].username,
            },
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server mengalami Error: Login",
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
            message: "Server mengalami Error: Register",
            error,
        });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const { id } = jwtDecode(refreshToken);

        const [users] = await getUserById(id);

        if (users.length <= 0) res.status(403);
        await nullToken(id);
        res.clearCookie("refreshToken");
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
