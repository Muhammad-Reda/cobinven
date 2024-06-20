import express from "express";
import barangRoutes from "./routes/barang.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/barang", barangRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening to port: ${process.env.PORT}`);
});
