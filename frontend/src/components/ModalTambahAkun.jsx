import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import ButtonGreen from "./ui/ButtonGreen";
import ButtonXClose from "./ui/ButtonXClose";
import ButtonRed from "./ui/ButtonRed";
import Input from "./ui/Input";
import { tambahAkun } from "../api/akun";

import { IoIosAdd } from "react-icons/io";

function ModalTambahAkun({ status, failed }) {
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

    useEffect(() => {
        refreshToken();
    }, [showModal]);

    const callTambahAkun = () => {
        tambahAkun({
            token,
            username,
            password,
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
                                        Tambah Data Akun
                                    </h3>
                                    <ButtonXClose
                                        callback={() => setShowModal(false)}
                                    />
                                </div>
                                {/*body*/}
                                <form
                                    onSubmit={handleSubmit(callTambahAkun)}
                                    className="p-4 md:p-5"
                                >
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <p className="text-red-500 text-xl">
                                            {erorrMsg && erorrMsg}
                                        </p>
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

export default ModalTambahAkun;
