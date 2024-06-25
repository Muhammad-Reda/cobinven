import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IoIosAdd } from "react-icons/io";

import { tambahBarang } from "../api/barang";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";

function ModalTambahBarang({ status, failed }) {
    const [showModal, setShowModal] = useState(false);
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [stok, setStok] = useState(0);
    const [deskripsi, setDeskripsi] = useState("");
    const [token, setToken] = useState("");
    const [erorrMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

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

    const callTambahBarang = () => {
        tambahBarang({ token, kode, nama, stok, deskripsi })
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
                                    <h3 className="text-3xl font-semibold uppercase">
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
                                    onSubmit={handleSubmit(callTambahBarang)}
                                    className="p-4 md:p-5"
                                >
                                    <div className="flex justify-center">
                                        <p className="text-red-500 text-xl">
                                            {erorrMsg && erorrMsg}
                                        </p>
                                    </div>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <Input
                                            label="Kode"
                                            htmlFor="Kode"
                                            type="text"
                                            name="kode"
                                            id="kode"
                                            placeholder="Kode barang"
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
                                            type="text"
                                            name="nama"
                                            id="nama"
                                            placeholder="Nama barang"
                                            register={register}
                                            errors={errors}
                                            required
                                            onChange={(e) =>
                                                setNama(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Stok"
                                            htmlFor="stok"
                                            type="number"
                                            name="stok"
                                            id="stok"
                                            placeholder="Stok barang"
                                            register={register}
                                            errors={errors}
                                            required
                                            onChange={(e) =>
                                                setStok(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Deskripsi"
                                            htmlFor="deskripsi"
                                            type="text"
                                            name="deskripsi"
                                            id="deskripsi"
                                            placeholder="Deskripsi"
                                            register={register}
                                            errors={errors}
                                            onChange={(e) =>
                                                setDeskripsi(e.target.value)
                                            }
                                        />
                                    </div>
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
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalTambahBarang;
