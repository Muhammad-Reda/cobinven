import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Inven from "../assets/Inven.jpg";
import ButtonDefault from "../components/ui/ButtonDefault";
import Input from "../components/ui/Input";
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
        <div>
            <div className=" bg-slate-100 flex justify-center items-center h-screen">
                {/* Left: Image */}
                <div className="w-1/2 h-screen hidden lg:block">
                    <img
                        src={Inven}
                        alt="Placeholder Image"
                        className="object-cover object-center w-full h-full"
                    />
                </div>
                {/* Right: Login Form */}

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    {alert && (
                        <AlertRed
                            showAlertProps={alert}
                            text={msg}
                            buttonX={() => setAlert(false)}
                        />
                    )}
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Login Button */}
                        <div className="flex justify-center mt-8">
                            <ButtonDefault type="submit" content="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
