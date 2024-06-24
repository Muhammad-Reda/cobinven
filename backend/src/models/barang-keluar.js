import connection from "../config/databse.js";

export const getAllBarangKeluar = () => {
    const query =
        "SELECT bk.id, bk.kode_barang, b.nama, bk.tanggal_keluar, bk.jumlah, bk.deskripsi  FROM barang_keluar as bk JOIN barang as b WHERE b.kode = bk.kode_barang";
    return connection.execute(query);
};

export const getBarangKeluar = (id) => {
    const query = `SELECT * FROM barang_keluar WHERE id = ${id}`;
    return connection.execute(query);
};

export const createBarangKeluar = (data) => {
    const query = `INSERT INTO barang_keluar(kode_barang, tanggal_keluar, jumlah, deskripsi) VALUES(?, ?, ?, ?)`;
    return connection.execute(query, [
        data.kode_barang,
        data.tanggal_keluar,
        data.jumlah,
        data.deskripsi,
    ]);
};

export const updateBarangKeluar = (data, id) => {
    const query = `UPDATE barang_keluar SET kode_barang = '${data.kode_barang}', tanggal_keluar = '${data.tanggal_keluar}', jumlah = ${data.jumlah}, deskripsi = '${data.deskripsi}' WHERE id = ${id}`;
    return connection.execute(query);
};

export const deleteBarangKeluar = (id) => {
    const query = `DELETE FROM barang_keluar WHERE id = ${id}`;
    return connection.execute(query);
};

export const kembalikanStok = (jumlah, kode) => {
    const query = `UPDATE barang SET stok = stok + ${jumlah} WHERE kode = '${kode}'`;
    return connection.execute(query);
};
