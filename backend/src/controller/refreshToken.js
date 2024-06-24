import jwt from "jsonwebtoken";
import { findRefToken } from "../models/auth.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const users = await findRefToken(refreshToken);

        if (users.length <= 0) return res.sendStatus(403);
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            (err, decode) => {
                if (err) return res.sendStatus(403);
                const userId = users[0].id;
                const username = users[0].username;
                const accessToken = jwt.sign(
                    { userId, username },
                    process.env.JWT_ACCESS_SECRET,
                    {
                        expiresIn: "15s",
                    }
                );
                res.json({ accessToken });
            }
        );
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
