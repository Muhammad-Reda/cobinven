import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ButtonDefault from "../components/ui/ButtonDefault";
import Input from "../components/ui/InputLogin.jsx";
import AlertRed from "../components/ui/AlertRed.jsx";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/auth/login",
                {
                    username: username,
                    password: password,
                }
            );
            if (response.data.message === "Success") {
                navigate("/");
            }
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    setMsg("Username atau password salah");
                    setAlert(true);
                    reset();
                    break;
                case 404:
                    setMsg("Akun tidak ditemukan");
                    setAlert(true);
                    reset();

                    break;

                default:
                    setMsg(
                        "Server mengalami masalah, silahkan coba lagi nanti"
                    );
                    setAlert(true);
                    reset();

                    break;
            }
        }
    };

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
                setMsg("");
            }, 5000); // Menyembunyikan alert setelah 3 detik

            return () => clearTimeout(timer);
        }
    }, [alert, msg]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                {alert && (
                                    <AlertRed
                                        showAlertProps={alert}
                                        text={msg}
                                        buttonX={() => setAlert(false)}
                                    />
                                )}
                                <h1 className="text-2xl font-semibold">
                                    Login
                                </h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <form onSubmit={handleSubmit(login)}>
                                        {/* Username Input */}
                                        <Input
                                            type="text"
                                            label="Username"
                                            htmlFor="username"
                                            placeholder="Username"
                                            register={register}
                                            errors={errors}
                                            id="username"
                                            name="username"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            required
                                        />
                                        {/* Password Input */}
                                        <Input
                                            type="password"
                                            label="Password"
                                            htmlFor="password"
                                            placeholder="Password"
                                            register={register}
                                            errors={errors}
                                            id="password"
                                            name="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                        {/* Login Button */}
                                        <div className="flex justify-center mt-8">
                                            <ButtonDefault
                                                type="submit"
                                                content="Login"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
