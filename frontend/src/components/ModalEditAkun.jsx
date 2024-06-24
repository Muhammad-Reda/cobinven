import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonYellow from "./ui/ButtonYellow";
import ButtonGreen from "./ui/ButtonGreen";
import ButtonRed from "./ui/ButtonRed";
import ButtonXClose from "./ui/ButtonXClose";
import Input from "./ui/Input";
import axios from "axios";
import { editAkun } from "../api/akun";

import { HiOutlinePencilAlt } from "react-icons/hi";

function ModalEditAkun({ id, status }) {
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

    const callEditAkun = () => {
        editAkun({ username, password, token, id })
            .then((response) => {
                status("sukses");
                setShowModal(false);
                reset();
                setErrorMsg("");
            })
            .catch((error) => {
                setErrorMsg(error);
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
                                        Ubah Data Akun
                                    </h3>
                                    <ButtonXClose
                                        callback={() => setShowModal(false)}
                                    />
                                </div>
                                {/*body*/}
                                <form
                                    onSubmit={handleSubmit(callEditAkun)}
                                    className="p-4 md:p-5"
                                >
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <Input
                                            label="Username"
                                            htmlFor="username"
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Username Akun"
                                            register={register}
                                            errors={errors}
                                            required
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Password"
                                            htmlFor="password"
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="********"
                                            register={register}
                                            errors={errors}
                                            required
                                            onChange={(e) =>
                                                setPassword(e.target.value)
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

export default ModalEditAkun;
