import { useState } from "react";
import { SidebarData } from "./SidebarData";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);

    return (
        <>
            <div className="flex items-start h-screen">
                <div
                    className={`h-[100vh] shadow-2xl text-gray-400 text-[18px] transition-all duration-300 ${
                        click && "w-[50px]"
                    }`}
                >
                    <div className="flex items-start gap-[20px] p-4">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-[4px] items-center transition-all duration-300"></div>
                        {!click && (
                            <p className="text-blue-600 text-[20px] font-semibold">
                                Inventory App
                            </p>
                        )}
                    </div>
                    <ul className="flex flex-col gap-14 p-4 mt-10">
                        {SidebarData.map((item) => (
                            <Link
                                to={item.path}
                                className="flex items-center gap-x-2 transition-all duration-300 text-black"
                                key={item.id}
                            >
                                <span title={item.title}>{item.icon}</span>
                                {!click && item.title}
                            </Link>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => setClick(!click)}
                    className={`bg-white shadow-lg rounded-full p-2 ms-[-20px] mt-4 transition-all duration-300 ${
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
