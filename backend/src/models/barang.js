import connection from "../config/databse.js";

export const getAllBarang = () => {
    const query = "SELECT * FROM barang";
    return connection.execute(query);
};

export const getBarang = (kode) => {
    const query = `SELECT * FROM barang WHERE kode = ${kode}`;
    return connection.execute(query);
};

export const createNewBarang = (data) => {
    const query = `INSERT INTO barang (kode, nama, stok, deskripsi) VALUES('${data.kode}', '${data.nama}', ${data.stok} ,'${data.deskripsi}')`;
    return connection.execute(query);
};

export const updateBarang = (data, kode) => {
    const query = `UPDATE barang 
                SET nama = '${data.nama}', stok = ${data.stok}, deskripsi = '${data.deskripsi}' 
                WHERE kode = '${kode}'`;
    return connection.execute(query);
};
