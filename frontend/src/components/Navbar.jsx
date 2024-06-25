import { SidebarData } from "./SidebarData";
import { IoIosArrowRoundForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiPower } from "react-icons/ci";

function Navbar() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

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
    const logout = async () => {
        try {
            await axios.delete("http://localhost:4000/auth/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/login");
        } catch (error) {
            if (error.response) navigate("/login");
        }
    };
    useEffect(() => {
        refreshToken();
    }, [click]);
    return (
        <>
            <div className="flex items-start h-screen">
                <div
                    className={`h-[100vh] shadow-2xl text-gray-400 text-[18px] transition-all duration-300 ${
                        click && "w-[80px]"
                    }`}
                >
                    <div className="flex items-start gap-[20px] p-4">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-[4px] items-center transition-all duration-300"></div>
                        {!click && (
                            <p className="text-gray-600 text-[20px] font-semibold">
                                Inventory App
                            </p>
                        )}
                    </div>
                    <ul className="flex flex-col gap-7 p-4 mt-10 rounded-lg">
                        {SidebarData.map((item) => (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-x-3 transition-all duration-300 text-black p-3 b rounded-md hover:bg-gray-100 ${
                                        isActive ? "bg-gray-200" : ""
                                    }`
                                }
                                key={item.id}
                            >
                                <span title={item.title}>{item.icon}</span>
                                {!click && item.title}
                            </NavLink>
                        ))}
                        <div className=" mt-16">
                            <NavLink
                                className="flex items-end gap-x-3 transition-all duration-300 text-black p-3 b rounded-md hover:bg-gray-100 "
                                onClick={logout}
                            >
                                <CiPower />
                                {!click && "Logout"}
                            </NavLink>
                        </div>
                    </ul>
                </div>
                <button
                    onClick={() => setClick(!click)}
                    className={`bg-gray-500 shadow-lg rounded-full p-2 ms-[-20px] mt-4 transition-all duration-300 ${
                        click && "transform rotate-180"
                    }`}
                >
                    <IoIosArrowRoundForward />
                </button>
            </div>
        </>
    );
}

export default Navbar;
