import PopUpDeleteBarang from "./PopUpDeleteBarang";
import ModalEditBarang from "./ModalEditBarang";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import ReactPaginate from "react-paginate";

function TableBarang({ data, token, updateData, page, pages }) {
    const handleStatus = (value) => {
        updateData(value);
    };

    const changePage = ({ selected }) => {
        page(selected);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
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
                    {data.map((data, i) => (
                        <tr className="bg-white border-b " key={i}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                            >
                                {i + 1}
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                            >
                                {data.kode}
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
                                <ModalEditBarang
                                    kode={data.kode}
                                    status={handleStatus}
                                    token={token}
                                />
                                <PopUpDeleteBarang
                                    token={token}
                                    kode={data.kode}
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

export default TableBarang;
