import * as CiIcons from "react-icons/ci";

export const SidebarData = [
    {
        id: 1,
        title: "Barang",
        path: "/",
        icon: <CiIcons.CiBoxes className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 2,
        title: "Akun",
        path: "/akun",
        icon: <CiIcons.CiUser className="text-xl text-black" />,
        cName: "nav-text",
    },

    {
        id: 4,
        title: "Barang Masuk",
        path: "/barang-masuk",
        icon: <CiIcons.CiInboxIn className="text-xl text-black" />,
        cName: "nav-text",
    },
    {
        id: 5,
        title: "Barang Keluar",
        path: "/barang-keluar",
        icon: <CiIcons.CiInboxOut className="text-xl text-black" />,
        cName: "nav-text",
    },
];
