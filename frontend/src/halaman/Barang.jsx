import TableBarang from "../components/ui/TableBarang";
import ModalTambahBarang from "../components/ModalTambahBarang";
import Search from "../components/ui/Search";

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
            <h2 className=" uppercase  font-bold text-3xl p-4 mb-8">
                Daftar data barang
            </h2>
            <div className="flex justify-between">
                <Search placeholder="Cari nama barang" />
                <ModalTambahBarang />
            </div>

            <TableBarang data={data} />
        </>
    );
}

export default Barang;
