import { useState } from "react";
import ButtonRed from "./ui/ButtonRed";
import ButtonGreen from "./ui/ButtonGreen";
import { IoTrashBinOutline } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";

export default function PopupModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ButtonRed
                type="buton"
                callback={() => setShowModal(true)}
                content=<IoTrashBinOutline />
            />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <div className="flex-1 flex justify-center">
                                        <CgDanger size={60} color="red" />
                                    </div>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <IoIosClose />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        Apakah anda yakin untuk menghapus data
                                        ini?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-4 border-t border-solid border-blueGray-200 rounded-b">
                                    <div className=" pr-2 pl-2">
                                        <ButtonRed
                                            type="button"
                                            callback={() => setShowModal(false)}
                                            content="Yes"
                                        />
                                    </div>
                                    <div className=" pr-2 pl-2">
                                        <ButtonGreen
                                            type="button"
                                            callback={() => setShowModal(false)}
                                            content="Cancel"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
