import PopUpDeleteAkun from "../components/PopUpDeleteAkun";
import ModalEditAkun from "./ModalEditAkun";
import Pagination from "./ui/Pagination";

function TableAkun({ data, token, updateData }) {
    const handleStatus = (value) => {
        updateData(value);
    };
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
                    {data.map((data, i) => (
                        <tr className="bg-white border-b " key={i}>
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
                                <ModalEditAkun
                                    id={data.id}
                                    status={handleStatus}
                                    token={token}
                                />
                                <PopUpDeleteAkun
                                    token={token}
                                    id={data.id}
                                    status={handleStatus}
                                />
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
