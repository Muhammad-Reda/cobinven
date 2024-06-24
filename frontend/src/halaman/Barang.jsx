import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TableBarang from "../components/TableBarang";
import ModalTambahBarang from "../components/ModalTambahBarang";
import Search from "../components/ui/Search";

import { getDataBarang } from "../api/barang";

const dataKosong = [
    {
        kode: "0",
        nama: "Silahkan tambah data",
        stok: 0,
        deskripsi: "Belum ada data yang tersimpan",
    },
];

function Barang() {
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [limit, setLimit] = useState(10);
    const [rows, setRows] = useState(0);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [keyword, setKeyword] = useState("");

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

    const callGetDataBarang = () => {
        getDataBarang({ token, keyword, limit, page })
            .then((response) => {
                setData(response.data.data);
                setPage(response.data.pagination.page);
                setPages(response.data.pagination.totalPage);
                setRows(response.data.pagination.rows);
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

    const handlePage = (value) => {
        setPage(value);
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
            callGetDataBarang();
        }
    }, [token, status, page, keyword]);

    return (
        <>
            <h2 className=" uppercase  font-bold text-3xl p-4 mb-8">
                Daftar data barang
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
                <Search
                    placeholder="Cari nama barang"
                    onchange={(e) => setKeyword(e.target.value)}
                    onClick={callGetDataBarang}
                />

                <ModalTambahBarang status={handleStatus} failed={handeFailed} />
            </div>

            {data.length > 0 ? (
                <TableBarang
                    data={data}
                    token={token}
                    updateData={handleStatus}
                    rows={rows}
                    page={handlePage}
                    pages={pages}
                />
            ) : (
                <TableBarang data={dataKosong} />
            )}
        </>
    );
}

export default Barang;
