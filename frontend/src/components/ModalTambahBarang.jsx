import { useState } from "react";

import { IoIosAdd } from "react-icons/io";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";

function ModalTambahBarang() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ButtonGreen
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
                                    <h3 className="text-3xl font-semibold uppercase">
                                        Tambah Data Barang
                                    </h3>
                                    <ButtonXClose
                                        callback={() => setShowModal(false)}
                                    />
                                </div>
                                {/*body*/}
                                <form className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <Input
                                            label="Kode"
                                            htmlFor="Kode"
                                            type="text"
                                            name="kode"
                                            id="kode"
                                            placeholder="Kode barang"
                                            required=""
                                        />
                                        <Input
                                            label="nama"
                                            htmlFor="nama"
                                            type="text"
                                            name="nama"
                                            id="nama"
                                            placeholder="Nama barang"
                                            required=""
                                        />
                                        <Input
                                            label="stok"
                                            htmlFor="stok"
                                            type="number"
                                            name="stok"
                                            id="stok"
                                            placeholder="Stok barang"
                                            required=""
                                        />
                                        <Input
                                            label="Deskripsi"
                                            htmlFor="Deskripsi"
                                            type="text"
                                            name="Deskripsi"
                                            id="Deskripsi"
                                            placeholder="Deskripsi"
                                            required=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <ButtonRed
                                            type="buton"
                                            content="Close"
                                            callback={() => setShowModal(false)}
                                        />

                                        <ButtonGreen
                                            type="submit"
                                            content="SAVE CHANGES"
                                            callback={() => setShowModal(false)}
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
