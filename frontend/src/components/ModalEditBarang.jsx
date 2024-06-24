import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonYellow from "./ui/ButtonYellow";
import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";

import { HiOutlinePencilAlt } from "react-icons/hi";
import { editBarang } from "../api/barang";

function ModalEditBarang({ kode, status, token }) {
    const [showModal, setShowModal] = useState(false);
    const [nama, setNama] = useState("");
    const [stok, setStok] = useState(0);
    const [deskripsi, setDeskripsi] = useState("");
    const [erorrMsg, setErrorMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const callEditBarang = () => {
        editBarang({ kode, nama, stok, deskripsi, token })
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

    return (
        <>
            <ButtonYellow
                type="button"
                callback={() => setShowModal(true)}
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
                                        Ubah Data Barang
                                    </h3>
                                    <ButtonXClose
                                        callback={() => setShowModal(false)}
                                    />
                                </div>
                                {/*body*/}
                                <form
                                    onSubmit={handleSubmit(callEditBarang)}
                                    className="p-4 md:p-5"
                                >
                                    <div className="flex justify-center">
                                        <p className="text-red-500 text-xl">
                                            {erorrMsg && erorrMsg}
                                        </p>
                                    </div>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
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

export default ModalEditBarang;
