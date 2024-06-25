import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonYellow from "./ui/ButtonYellow";
import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";

import { HiOutlinePencilAlt } from "react-icons/hi";
import { editBarangKeluar, getBarangKeluarById } from "../api/barangKeluar";

function ModalEditBarangKeluar({ id, status }) {
    const [showModal, setShowModal] = useState(false);
    const [kode, setKode] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jumlah, setJumlah] = useState(0);
    const [deskripsi, setDeskripsi] = useState("");
    const [erorrMsg, setErrorMsg] = useState("");
    const [token, setToken] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    function convertToDateInputFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const callEditBarangKeluar = () => {
        editBarangKeluar({ token, kode, tanggal, deskripsi, jumlah, id })
            .then((response) => {
                status("sukses");
                setShowModal(false);
                reset();
                setErrorMsg("");
            })
            .catch((error) => {
                setErrorMsg(error.response.data.message);
                status("gagal");
                reset();
            });
    };

    const callGetBarangKeluar = () => {
        getBarangKeluarById({ token, id })
            .then((response) => {
                // Parse the tanggal_keluar string into a Date object
                const tanggalKeluarDate = new Date(
                    response.data.data[0].tanggal_keluar
                );

                // Convert to YYYY-MM-DD format
                const formattedDate =
                    convertToDateInputFormat(tanggalKeluarDate);
                setKode(response.data.data[0].kode_barang);
                setTanggal(formattedDate);
                setJumlah(response.data.data[0].jumlah);
                setDeskripsi(response.data.data[0].deskripsi);
            })
            .catch((error) => {
                setErrorMsg(error.response.data.message);
                status("gagal");
                reset();
            });
    };

    return (
        <>
            <ButtonYellow
                type="button"
                callback={() => {
                    setShowModal(true);
                    callGetBarangKeluar();
                }}
                content=<HiOutlinePencilAlt />
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
                                        Ubah Data Barang Keluar
                                    </h3>
                                    <ButtonXClose
                                        callback={() => setShowModal(false)}
                                    />
                                </div>
                                {/*body*/}
                                <form
                                    onSubmit={handleSubmit(
                                        callEditBarangKeluar
                                    )}
                                    className="p-4 md:p-5"
                                >
                                    {erorrMsg && erorrMsg}
                                    <div className="grid gap-4 mb-4 grid-cols-2">
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
                                            value={kode}
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
                                            value={tanggal}
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
                                            value={jumlah}
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
                                            value={deskripsi}
                                        />
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <ButtonRed
                                            type="button"
                                            content="Close"
                                            callback={() => setShowModal(false)}
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

export default ModalEditBarangKeluar;
