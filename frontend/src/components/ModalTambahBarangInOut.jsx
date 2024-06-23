import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import Input from "./ui/Input";

import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function ModalTambahBarangInOut({ text, text1, text2 }) {
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
            <ButtonGreen
                text={text1}
                text2={text2}
                type="button"
                callback={() => setShowModal(true)}
                content=<IoIosAdd size={20} />
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
                                        Tambah Data {text}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <IoIosClose />
                                    </button>
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
                                    />
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

export default ModalTambahBarangInOut;
