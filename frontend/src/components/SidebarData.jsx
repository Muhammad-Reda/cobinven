import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
    {
        id: 1,
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 2,
        title: "Akun",
        path: "/akun",
        icon: <FaIcons.FaUserCircle className="text-xl text-black" />,
        cName: "nav-text",
    },

    {
        id: 4,
        title: "Barang Masuk",
        path: "/barang-masuk",
        icon: <FaIcons.FaInbox className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 5,
        title: "Barang Keluar",
        path: "/barang-keluar",
        icon: <FaIcons.FaBoxOpen className="text-xl text-black" />,
        cName: "nav-text",
    },
];
