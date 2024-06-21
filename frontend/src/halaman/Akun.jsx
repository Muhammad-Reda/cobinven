import Table from "../components/Table";
import ButtonTambah from "../components/ButtonTambah";

function Akun() {
    const handleClick = () => {
        // e.preventDefault();
        alert("Haii");
    };

    return (
        <>
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

export default Akun;
