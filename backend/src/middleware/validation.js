import jwt from "jsonwebtoken";

export const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({
            message: "Token diperlukan",
        });

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret);
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    next();
};
