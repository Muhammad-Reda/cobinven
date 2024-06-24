import axios from "axios";

export const getDataBarang = async ({ token, keyword, limit, page }) => {
    const response = await axios.get(
        `http://localhost:4000/barang?search=${keyword}&page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const tambahBarang = async ({ token, kode, nama, stok, deskripsi }) => {
    const response = await axios.post(
        "http://localhost:4000/barang",
        {
            kode,
            nama,
            stok,
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

export const editBarang = async ({ kode, nama, stok, deskripsi, token }) => {
    const response = await axios.patch(
        "http://localhost:4000/barang/" + kode,
        {
            nama,
            stok,
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

export const deleteBarang = async ({ token, kode }) => {
    const response = await axios.delete(
        "http://localhost:4000/barang/" + kode,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
