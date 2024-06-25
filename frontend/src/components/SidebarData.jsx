import * as CiIcons from "react-icons/ci";

export const SidebarData = [
    {
        id: 5,
        title: "Home",
        path: "/",
        icon: <CiIcons.CiHome className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 1,
        title: "Barang",
        path: "/barang",
        icon: <CiIcons.CiBoxes className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 2,
        title: "Barang Masuk",
        path: "/barang-masuk",
        icon: <CiIcons.CiInboxIn className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 3,
        title: "Barang Keluar",
        path: "/barang-keluar",
        icon: <CiIcons.CiInboxOut className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 4,
        title: "Akun",
        path: "/akun",
        icon: <CiIcons.CiUser className="text-xl text-black" />,
        cName: "nav-text",
    },
];
