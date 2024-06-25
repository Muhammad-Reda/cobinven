import TableAkun from "../components/TableAkun";
import ModalTambahAkun from "../components/ModalTambahAkun";
import Search from "../components/ui/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDataAkun } from "../api/akun";
import Top from "../components/ui/Top";
const dataKosong = [
    {
        kode: 0,
        id: 0,
        username: "Tidak ada akun",
    },
];
function Akun() {
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [limit, setLimit] = useState(10);
    const [rows, setRows] = useState(0);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [keyword, setKeyword] = useState("");

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

    const callGetDataAkun = () => {
        getDataAkun({ token, keyword, limit, page })
            .then((response) => {
                setData(response.data.data);
                setPage(response.data.pagination.page);
                setPages(response.data.pagination.totalPage);
                setRows(response.data.pagination.rows);
            })
            .catch((error) => {
                if (error.response) setErrorMessage(error.response.message);
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
            callGetDataAkun();
        }
    }, [token, status, page, keyword]);
    return (
        <>
            <Top textKanan="daftar data Akun" />
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
            <div className="flex justify-between mt-8 w-full px-5">
                <Search
                    placeholder="Cari username"
                    onchange={(e) => setKeyword(e.target.value)}
                    onClick={callGetDataAkun}
                />
                <ModalTambahAkun status={handleStatus} failed={handeFailed} />
            </div>

            <div className="mt-2 w-full px-5">
                {data.length > 0 ? (
                    <TableAkun
                        data={data}
                        token={token}
                        updateData={handleStatus}
                        page={handlePage}
                        pages={pages}
                    />
                ) : (
                    <TableAkun data={dataKosong} />
                )}
            </div>
        </>
    );
}

export default Akun;
