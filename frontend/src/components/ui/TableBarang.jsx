import PopupModal from "../PopupModal";
import ModalEditBarang from "../ModalEditBarang";
import Pagination from "./Pagination";

function TableBarang({ data }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Kode
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Nama</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Stok</div>
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
                                {data.nama}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.stok}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.deskripsi}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap text-right">
                                <ModalEditBarang />
                                <PopupModal />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination callback={() => alert("Callback pagination")} />
        </div>
    );
}

export default TableBarang;
