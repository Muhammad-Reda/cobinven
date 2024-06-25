import axios from "axios";

export const getDataBarangMasuk = async ({ token, keyword, limit, page }) => {
    const response = await axios.get(
        `http://localhost:4000/barang-masuk?search=${keyword}&page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const getBarangMasukById = async ({ token, id }) => {
    const response = await axios.get(
        `http://localhost:4000/barang-masuk/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const tambahBarangMasukStok = async ({
    token,
    kode,
    tanggal,
    deskripsi,
    jumlah,
}) => {
    const response = await axios.post(
        "http://localhost:4000/barang-masuk/stok",
        {
            kode_barang: kode,
            tanggal_masuk: tanggal,
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

export const tambahBarangMasukBarang = async ({
    token,
    kode,
    tanggal,
    deskripsi,
    jumlah,
    nama,
}) => {
    const response = await axios.post(
        "http://localhost:4000/barang-masuk/barang",
        {
            kode_barang: kode,
            tanggal_masuk: tanggal,
            nama,
            jumlah: Number(jumlah),
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

export const editBarangMasuk = async ({
    token,
    kode,
    tanggal,
    deskripsi,
    jumlah,
    id,
}) => {
    const response = await axios.patch(
        "http://localhost:4000/barang-masuk/" + id,
        {
            kode_barang: kode,
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

export const deleteBarangMasuk = async ({ token, id }) => {
    const response = await axios.delete(
        "http://localhost:4000/barang-masuk/" + id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
