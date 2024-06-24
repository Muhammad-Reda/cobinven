import ModalTambahBarangKeluar from "../components/ModalTambahBarangKeluar";
import Search from "../components/ui/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TableBarangKeluar from "../components/TableBarangKeluar";
import { getDataBarangKeluar } from "../api/barangKeluar";

const dataKosong = [
    {
        id: 0,
        kodeBarang: "0",
        nama: "o",
        tanggal: "o",
        jumlah: 0,
        deskripsi: "Tidak ada data",
    },
];

function BarangKeluar() {
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:4000/token");
            setToken(response.data.accessToken);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    const callGetDataBarangKeluar = () => {
        getDataBarangKeluar({ token })
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                if (error.response) console.log(error.response);
            });
    };

    const handleStatus = (value) => {
        setStatus(value);
    };
    const handeFailed = (value) => {
        setErrorMessage(value);
    };

    useEffect(() => {
        refreshToken();
    }, []);

    useEffect(() => {
        if (status === "sukses" || status === "gagal") {
            const timer = setTimeout(() => {
                setStatus(0);
            }, 1000); // Menyembunyikan alert setelah 3 detik

            return () => clearTimeout(timer);
        }
    }, [status]);

    useEffect(() => {
        if (token) {
            callGetDataBarangKeluar();
            console.log(data);
        }
    }, [token, status]);

    return (
        <>
            <h2 className=" uppercase  font-bold text-3xl p-4 mb-8">
                Daftar data Barang Keluar
            </h2>
            {status === "sukses" && (
                <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500 ">
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        Sukses
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setStatus("")}
                    >
                        <span>×</span>
                    </button>
                </div>
            )}
            {status === "gagal" && (
                <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500 ">
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        Gagal
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setStatus("")}
                    >
                        <span>×</span>
                    </button>
                </div>
            )}
            <div className="flex justify-between">
                <Search placeholder="Cari barang" />
                <ModalTambahBarangKeluar
                    status={handleStatus}
                    failed={handeFailed}
                />
            </div>

            {data.length > 0 ? (
                <TableBarangKeluar
                    data={data}
                    token={token}
                    updateData={handleStatus}
                />
            ) : (
                <TableBarangKeluar data={dataKosong} />
            )}
        </>
    );
}

export default BarangKeluar;
