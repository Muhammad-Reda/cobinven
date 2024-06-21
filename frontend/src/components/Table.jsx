import ButtonEdit from "./ButtonEdit";
import ButtonTambah from "./ButtonTambah";
import ButtonHapus from "./ButtonHapus";

function Table() {
    const data = [
        {
            id: 1,
            nama: "batu",
            stok: 3,
            deskripsi: "Desc",
        },
        {
            id: 2,
            nama: "batu",
            stok: 3,
            deskripsi: "Desc",
        },
        {
            id: 3,
            nama: "batu",
            stok: 3,
            deskripsi: "Desc",
        },
        {
            id: 4,
            nama: "batu",
            stok: 3,
            deskripsi: "Desc",
        },
    ];
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
                                <ButtonHapus
                                    type="buton"
                                    callback={() => alert("Hapus" + data.id)}
                                    content="Hapus"
                                />
                                <ButtonEdit
                                    type="button"
                                    callback={() => alert("Edit" + data.id)}
                                    content="Edit"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
