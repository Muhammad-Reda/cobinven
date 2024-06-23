import TableBarangInOut from "../components/ui/TableBarangInOut";
import ModalTambahBarangInOut from "../components/ModalTambahBarangInOut";
import Search from "../components/ui/Search";

function BarangKeluar() {
    const data = [
        {
            id: 1,
            kodeBarang: "0001",
            nama: "Batu",
            tanggal: "2024-06-21",
            jumlah: 5,
            deskripsi: "Desc",
        },
        {
            id: 2,
            kodeBarang: "0001",
            nama: "Batu 2",
            tanggal: "2024-06-21",
            jumlah: 5,
            deskripsi: "Desc",
        },
        {
            id: 3,
            kodeBarang: "0001",
            nama: "Batu 3",
            tanggal: "2024-06-21",
            jumlah: 5,
            deskripsi: "Desc",
        },
        {
            id: 4,
            kodeBarang: "0001",
            nama: "Batu 4",
            tanggal: "2024-06-21",
            jumlah: 5,
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
                Daftar data Barang Keluar
            </h2>
            <div className="flex justify-between">
                <Search placeholder="Cari barang" />
                <ModalTambahBarangInOut text="BARANG KELUAR" />
            </div>

            <TableBarangInOut data={data} />
        </>
    );
}

export default BarangKeluar;
