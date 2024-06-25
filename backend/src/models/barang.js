import connection from "../config/databse.js";

export const getAllBarang = ({ search, limit, offset }) => {
    const query = `SELECT * FROM barang WHERE nama LIKE CONCAT('%','${search}', '%') ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset} `;
    return connection.execute(query);
};

export const getKodeBarang = () => {
    const query = "SELECT kode, nama FROM barang ORDER BY kode";
    return connection.execute(query);
};

export const totalPageData = () => {
    const query = `SELECT COUNT(*) AS count FROM barang`;
    return connection.execute(query);
};

export const getBarang = (kode) => {
    const query = `SELECT * FROM barang WHERE kode = '${kode}'`;
    return connection.execute(query);
};

export const createNewBarang = (data) => {
    const query = `INSERT INTO barang (kode, nama, stok, deskripsi) VALUES('${data.kode}', '${data.nama}', ${data.stok} ,'${data.deskripsi}')`;
    return connection.execute(query);
};

export const createNewBarangMasuk = (data) => {
    const query = `INSERT INTO barang (kode, nama, stok, deskripsi) VALUES('${data.kode_barang}', '${data.nama}', ${data.jumlah} ,'${data.deskripsi}')`;
    return connection.execute(query);
};

export const updateBarang = (data, kode) => {
    const query = `UPDATE barang 
                SET nama = '${data.nama}', stok = ${data.stok}, deskripsi = '${data.deskripsi}' 
                WHERE kode = '${kode}'`;
    return connection.execute(query);
};

export const deleteBarang = (kode) => {
    const query = `DELETE FROM barang WHERE kode = '${kode}'`;
    return connection.execute(query);
};

export const tambahStok = (data, kode) => {
    const query = `UPDATE barang 
    SET stok = stok + ${data.jumlah} 
    WHERE kode = '${kode}'`;
    return connection.execute(query);
};

export const kurangStok = (data, kode) => {
    const query = `UPDATE barang 
    SET stok = stok - ${data.jumlah} 
    WHERE kode = '${kode}'`;
    return connection.execute(query);
};

export const dataDashboard = () => {
    const query = `SELECT (SELECT COUNT(*) FROM barang) AS jumlah_barang, (SELECT COUNT(*) FROM barang_masuk) AS jumlah_barang_masuk,(SELECT COUNT(*) FROM barang_keluar) AS jumlah_barang_keluar`;
    return connection.execute(query);
};
