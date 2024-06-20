import express from "express";
import barangRoutes from "./routes/barang.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import barangMasukRoutes from "./routes/barang-masuk.js";
import barangKeluarRoutes from "./routes/barang-keluar.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/barang", barangRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/barang-masuk", barangMasukRoutes);
app.use("/barang-keluar", barangKeluarRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening to port: ${process.env.PORT}`);
});
