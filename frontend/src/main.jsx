import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page.jsx";
import Navbar from "./components/Navbar.jsx";
import Akun from "./halaman/Akun.jsx";
import Barang from "./halaman/Barang.jsx";
import BarangKeluar from "./halaman/BarangKeluar.jsx";
import BarangMasuk from "./halaman/BarangMasuk.jsx";
import Login from "./halaman/Login.jsx";

const AppLayout = () => (
    <>
        <div className="flex h-screen">
            <Navbar />
            <div
                className="flex-1 overflow-y-auto p-8"
                style={{ maxHeight: "100vh" }}
            >
                <Outlet />
            </div>
        </div>
    </>
);

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Barang />,
            },
            {
                path: "akun",
                element: <Akun />,
            },
            {
                path: "barang-masuk",
                element: <BarangMasuk />,
            },
            {
                path: "barang-keluar",
                element: <BarangKeluar />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
