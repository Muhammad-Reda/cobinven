import TableAkun from "../components/ui/TableAkun";
import ModalTambahAkun from "../components/ModalTambahAkun";
function Akun() {
    const data = [
        {
            kode: 1,
            id: 1,
            username: "User 1",
        },
        {
            kode: 2,
            id: 2,
            username: "User 2",
        },
        {
            kode: 3,
            id: 3,
            username: "User 3",
        },
        {
            kode: 4,
            id: 4,
            username: "User 4",
        },
    ];

    return (
        <>
            <h2 className=" uppercase text-center font-bold text-3xl p-4">
                Daftar data akun
            </h2>
            <div className="flex justify-end">
                <ModalTambahAkun />
            </div>

            <TableAkun data={data} />
        </>
    );
}

export default Akun;
