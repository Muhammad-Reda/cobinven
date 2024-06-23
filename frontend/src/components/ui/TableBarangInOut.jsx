import ButtonYellow from "./ButtonYellow";
import PopupModal from "../PopupModal";
import ModalEditBarangInOut from "../ModalEditBarangInOut";

import { HiOutlinePencilAlt } from "react-icons/hi";
import Pagination from "./Pagination";

function TableBarangInOut({ data }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-cyan-600 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Kode barang</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Nama</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Tanggal</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Jumlah</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Deskripsi</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only"></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => (
                        <tr className="bg-white border-b " key={data.id}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                            >
                                {data.id}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.kodeBarang}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.nama}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.tanggal}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.jumlah}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.deskripsi}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap text-right">
                                <ModalEditBarangInOut />
                                <PopupModal />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination callback={() => alert("Callback Pagination")} />
        </div>
    );
}

export default TableBarangInOut;
