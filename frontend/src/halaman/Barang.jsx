import ButtonTambah from "../components/ButtonTambah";
import Table from "../components/Table";

function Barang() {
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
                <ButtonTambah
                    type="button"
                    callback={handleClick}
                    content="Tambah"
                />
            </div>

            <Table />
        </>
    );
}

export default Barang;
