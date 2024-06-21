import React, { useState } from "react";
import Inven from "../assets/Inven.jpg";
import { Navigate } from "react-router-dom";
import ButtonDefault from "../components/ButtonDefault";

function Login() {
    const [toHome, setToHome] = useState(false);

    if (toHome) {
        return <Navigate to="/" />;
    }

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
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={() => setToHome(true)}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-600"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>

                        {/* Login Button */}
                        <ButtonDefault type="submit" content="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
