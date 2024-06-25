import { useState, useEffect } from "react";
import * as CiIcons from "react-icons/ci";
import * as MdIcons from "react-icons/md";
import { getDashboard } from "../api/barang";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Top from "../components/ui/Top";

const Home = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
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

    const callGetDataDashboard = () => {
        getDashboard({ token })
            .then((response) => {
                setData(response.data.data[0]);
            })
            .catch((error) => {
                if (error) setErrorMessage(error.response.data.message);
            });
    };

    useEffect(() => {
        refreshToken();
    }, []);

    useEffect(() => {
        if (token) {
            callGetDataDashboard();
        }
    }, [token]);

    return (
        <>
            <Top textKiri="Selamat Datang/" textKanan="Dashboard" />
            <div className="flex flex-wrap  mt-16">
                <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Barang
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                        {data.jumlah_barang}
                                    </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  ">
                                        <CiIcons.CiBoxes className="text-xl text-black" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-gray-500 mr-2">
                                    Jumlah keseluruhan Data Barang
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Barang masuk
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                        {data.jumlah_barang_masuk}
                                    </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  ">
                                        <CiIcons.CiInboxIn className="text-xl text-black" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-gray-500 mr-2">
                                    Jumlah Data Barang Masuk
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        barang keluar
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                        {data.jumlah_barang_keluar}
                                    </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div className=" p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                                        <CiIcons.CiInboxOut className="text-xl text-black" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-gray-500 mr-2">
                                    Jumlah Data Barang Keluar
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
