import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import Input from "./ui/Input";
import ButtonXClose from "./ui/ButtonXClose";
import axios from "axios";

import { IoIosAdd } from "react-icons/io";

import { tambahBarangMasukBarang } from "../api/barangMasuk";

function ModalTambahBarangMasukBarang({ status, failed }) {
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState("");

    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jumlah, setJumlah] = useState(0);
    const [deskripsi, setDeskripsi] = useState("");
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
        tambahBarangMasukBarang({
            token,
            kode,
            tanggal,
            deskripsi,
            jumlah,
            nama,
        })
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

    return (
        <>
            <ButtonGreen
                text="BARANG"
                type="button"
                callback={() => setShowModal(true)}
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
                                        Tambah Data Barang
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
                                    <Input
                                        label="Kode"
                                        htmlFor="kode"
                                        placeholder="Kode Barang"
                                        name="kode"
                                        id="kode"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        required
                                        onChange={(e) =>
                                            setKode(e.target.value)
                                        }
                                    />

                                    <Input
                                        label="Nama"
                                        htmlFor="nama"
                                        placeholder="Nama Barang"
                                        name="nama"
                                        id="nama"
                                        type="text"
                                        register={register}
                                        errors={errors}
                                        required
                                        onChange={(e) =>
                                            setNama(e.target.value)
                                        }
                                    />

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

export default ModalTambahBarangMasukBarang;
