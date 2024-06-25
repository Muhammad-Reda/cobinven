import express from "express";
import barangRoutes from "./routes/barang.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import barangMasukRoutes from "./routes/barang-masuk.js";
import barangKeluarRoutes from "./routes/barang-keluar.js";
import { refreshToken } from "./controller/refreshToken.js";
import { getDataDashboard } from "./controller/barang.js";
import { accessValidation } from "./middleware/validation.js";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

app.use("/barang", barangRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/barang-masuk", barangMasukRoutes);
app.use("/barang-keluar", barangKeluarRoutes);

app.get("/token", refreshToken);
app.get("/dashboard", accessValidation, getDataDashboard);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening to port: ${process.env.PORT}`);
});
