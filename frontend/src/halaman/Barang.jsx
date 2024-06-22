import TableBarang from "../components/ui/TableBarang";
import ModalTambahBarang from "../components/ModalTambahBarang";
function Barang() {
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
    const handleClick = () => {
        // e.preventDefault();
        alert("Haii");
    };

    return (
        <>
            <h2 className=" uppercase text-center font-bold text-3xl p-4">
                Daftar data barang
            </h2>
            <div className="flex justify-end">
                <ModalTambahBarang />
            </div>

            <TableBarang data={data} />
        </>
    );
}

export default Barang;
