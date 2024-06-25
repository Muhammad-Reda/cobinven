import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import Input from "./ui/Input";
import ButtonXClose from "./ui/ButtonXClose";

import { IoIosAdd } from "react-icons/io";
import { getKodeBarang } from "../api/barang";
import { tambahBarangMasukStok } from "../api/barangMasuk";

function ModalTambahBarangMasukStok({ status, failed }) {
    const [showModal, setShowModal] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [kode, setKode] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jumlah, setJumlah] = useState(0);
    const [deskripsi, setDeskripsi] = useState("");
    const [token, setToken] = useState("");
    const [erorrMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

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

    useEffect(() => {
        refreshToken();
    }, [showModal]);

    const callTambahBarangMasuk = () => {
        tambahBarangMasukStok({ token, kode, tanggal, jumlah, deskripsi })
            .then((response) => {
                status("sukses");
                setShowModal(false);
                reset();
                setErrorMsg("");
            })
            .catch((error) => {
                setErrorMsg(error.response.data.message);
                status("gagal");
                failed(erorrMsg);
                reset();
            });
    };

    const callGetAllDataBarang = () => {
        getKodeBarang({ token })
            .then((response) => {
                setSelectData(response.data.data);
            })
            .catch((error) => {
                setErrorMsg(error.response.data.message);
                status("gagal");
            });
    };

    return (
        <>
            <ButtonGreen
                text="STOK"
                type="button"
                callback={() => {
                    callGetAllDataBarang();
                    setShowModal(true);
                }}
                content=<IoIosAdd size={15} />
            />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className=" uppercase text-3xl font-semibold">
                                        Tambah Data Stok
                                    </h3>
                                    <ButtonXClose
                                        callback={() => {
                                            setShowModal(false);
                                            setErrorMsg("");
                                        }}
                                    />
                                </div>
                                {/*body*/}
                                <form
                                    onSubmit={handleSubmit(
                                        callTambahBarangMasuk
                                    )}
                                    className="p-4 md:p-5"
                                >
                                    <div className="flex justify-center">
                                        <p className="text-red-500 text-xl">
                                            {erorrMsg && erorrMsg}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="kode"
                                            className="block mb-2 text-sm font-medium text-black"
                                        >
                                            Kode
                                        </label>
                                        <select
                                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                            {...register("kode", {
                                                required: "Kode is required",
                                            })}
                                            onChange={(e) =>
                                                setKode(e.target.value)
                                            }
                                        >
                                            <option value="">Pilih kode</option>
                                            {selectData.map((item, i) => (
                                                <option
                                                    className="option"
                                                    key={i}
                                                    value={item.kode}
                                                >
                                                    {item.kode} - {item.nama}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.kode && (
                                            <span className="text-red-600">
                                                {errors.kode.message}
                                            </span>
                                        )}
                                    </div>
                                    <Input
                                        label="Tanggal"
                                        htmlFor="tanggal"
                                        placeholder="Tanggal"
                                        name="tanggal"
                                        id="tanggal"
                                        type="date"
                                        register={register}
                                        errors={errors}
                                        required
                                        onChange={(e) =>
                                            setTanggal(e.target.value)
                                        }
                                    />

                                    <Input
                                        label="Jumlah"
                                        htmlFor="jumlah"
                                        placeholder="Jumlah"
                                        name="jumlah"
                                        id="jumlah"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        required
                                        onChange={(e) =>
                                            setJumlah(e.target.value)
                                        }
                                    />

                                    <Input
                                        label="Deskripsi"
                                        htmlFor="deskripsi"
                                        placeholder="Deskripsi"
                                        name="deskripsi"
                                        id="deskripsi"
                                        type="text-area"
                                        register={register}
                                        errors={errors}
                                        onChange={(e) =>
                                            setDeskripsi(e.target.value)
                                        }
                                    />
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <ButtonRed
                                            type="button"
                                            content="Close"
                                            callback={() => {
                                                setShowModal(false);
                                                setErrorMsg("");
                                            }}
                                        />

                                        <ButtonGreen
                                            type="submit"
                                            content="SAVE CHANGES"
                                        />
                                    </div>
                                </form>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalTambahBarangMasukStok;
