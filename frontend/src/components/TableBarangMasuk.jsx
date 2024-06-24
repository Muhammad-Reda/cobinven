import PopUpDeleteBarangMasuk from "../components/PopUpDeleteBarangMasuk";
import ModalEditBarangMasuk from "./ModalEditBarangMasuk";

import Pagination from "./ui/Pagination";

function TableBarangMasuk({ data, token, updateData }) {
    const handleStatus = (value) => {
        updateData(value);
    };
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
                    {data.map((data, i) => (
                        <tr className="bg-white border-b " key={i}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                            >
                                {data.id}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.kode_barang}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.nama}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.tanggal_masuk}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.jumlah}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.deskripsi ? data.deskripsi : "Deskripsi"}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap text-right">
                                <ModalEditBarangMasuk
                                    id={data.id}
                                    status={handleStatus}
                                    token={token}
                                />
                                <PopUpDeleteBarangMasuk
                                    token={token}
                                    id={data.id}
                                    status={handleStatus}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination callback={() => alert("Callback Pagination")} />
        </div>
    );
}

export default TableBarangMasuk;
