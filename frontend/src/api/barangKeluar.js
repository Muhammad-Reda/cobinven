import axios from "axios";

export const getDataBarangKeluar = async ({ token }) => {
    const response = await axios.get("http://localhost:4000/barang-keluar", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const tambahBarangKeluar = async ({
    token,
    kode,
    tanggal,
    deskripsi,
    jumlah,
}) => {
    const response = await axios.post(
        "http://localhost:4000/barang-keluar",
        {
            kode_barang: kode,
            tanggal_keluar: tanggal,
            jumlah,
            deskripsi,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const editBarangKeluar = async ({
    token,
    kode,
    tanggal,
    deskripsi,
    jumlah,
    id,
}) => {
    const response = await axios.patch(
        "http://localhost:4000/barang-keluar/" + id,
        {
            kode_barang: kode,
            nama,
            tanggal_masuk: tanggal,
            deskripsi,
            jumlah,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const deleteBarangKeluar = async ({ token, id }) => {
    const response = await axios.delete(
        "http://localhost:4000/barang-keluar/" + id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
