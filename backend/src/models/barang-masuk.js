import connection from "../config/databse.js";

export const getAllBarangMasuk = () => {
    const query =
        "SELECT bm.id, bm.kode_barang, b.nama, bm.tanggal_masuk, bm.jumlah, bm.deskripsi FROM barang_masuk as bm JOIN barang as b WHERE b.kode = bm.kode_barang";
    return connection.execute(query);
};

export const getBarangMasuk = (id) => {
    const query = `SELECT * FROM barang_masuk WHERE id = ${id}`;
    return connection.execute(query);
};

export const createBarangMasuk = (data) => {
    const query = `INSERT INTO barang_masuk(kode_barang, tanggal_masuk, jumlah, deskripsi) VALUES(?, ?, ?, ?)`;
    return connection.execute(query, [
        data.kode_barang,
        data.tanggal_masuk,
        data.jumlah,
        data.deskripsi,
    ]);
};

export const updateBarangMasuk = (data, id) => {
    const query = `UPDATE barang_masuk SET kode_barang = '${data.kode_barang}', tanggal_masuk = '${data.tanggal_masuk}', jumlah = ${data.jumlah}, deskripsi = '${data.deskripsi}' WHERE id = ${id}`;
    return connection.execute(query);
};

export const deleteBarangMasuk = (id) => {
    const query = `DELETE FROM barang_masuk WHERE id = ${id}`;
    return connection.execute(query);
};

export const kembalikanStok = (jumlah, kode) => {
    const query = `UPDATE barang SET stok = stok - ${jumlah} WHERE kode = '${kode}'`;
    return connection.execute(query);
};
