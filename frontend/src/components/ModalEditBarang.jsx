import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonYellow from "./ui/ButtonYellow";
import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";

import { HiOutlinePencilAlt } from "react-icons/hi";

function ModalEditBarang() {
    const [showModal, setShowModal] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleClickSuccess = () => {
        setShowModal(false);
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
                                    onSubmit={handleSubmit(() => {
                                        reset();
                                        alert("Handle submit");
                                        setShowModal(false);
                                    })}
                                    className="p-4 md:p-5"
                                >
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
