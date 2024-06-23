import PopupModal from "../PopupModal";
import ModalEditAkun from "../ModalEditAkun";
import Pagination from "./Pagination";

function TableAkun({ data }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-amber-600 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Username</div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only"></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => (
                        <tr className="bg-white border-b " key={data.kode}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap "
                            >
                                {data.id}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {data.username}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap text-right">
                                <ModalEditAkun />
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

export default TableAkun;
