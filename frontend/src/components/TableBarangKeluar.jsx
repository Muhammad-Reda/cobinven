import PopUpDeleteBarangKeluar from "../components/PopUpDeleteBarangKeluar";
import ModalEditBarangKeluar from "../components/ModalEditBarangkeluar";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ReactPaginate from "react-paginate";

function TableBarangKeluar({ data, token, updateData, page, pages }) {
    const handleStatus = (value) => {
        updateData(value);
    };
    const changePage = ({ selected }) => {
        page(selected);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                <thead className="text-xs text-black uppercase bg-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
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
                                className="px-6 py-4 font-medium text-black whitespace-nowrap "
                            >
                                {i + 1}
                            </th>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {data.kode_barang}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {data.nama}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {data.tanggal_keluar}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {data.jumlah}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                {data.deskripsi ? data.deskripsi : "Deskripsi"}
                            </td>
                            <td className="px-6 py-4 font-medium text-black whitespace-nowrap text-right">
                                <ModalEditBarangKeluar
                                    id={data.id}
                                    status={handleStatus}
                                    token={token}
                                />
                                <PopUpDeleteBarangKeluar
                                    token={token}
                                    id={data.id}
                                    status={handleStatus}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-2 w-max">
                <nav className="block">
                    <ReactPaginate
                        onPageChange={changePage}
                        pageCount={pages}
                        nextLabel={<IoChevronForward />}
                        previousLabel={<IoChevronBack />}
                        containerClassName="flex justify-center pl-0 rounded list-none flex-wrap"
                        pageLinkClassName="mx-2 p-2"
                        activeClassName="bg-gray-500 text-white rounded"
                        previousClassName="mx-2 p-2"
                        nextClassName="mx-2 p-2"
                    />
                </nav>
            </div>
        </div>
    );
}

export default TableBarangKeluar;
