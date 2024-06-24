import connection from "../config/databse.js";

export const getUserByUsername = (username) => {
    const query = "SELECT * FROM users WHERE `username` = ?";
    return connection.execute(query, [username]);
};

export const getUserById = (id) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return connection.execute(query, [id]);
};

export const register = (username, password) => {
    const query = `INSERT INTO users (username, password) VALUES('${username}', '${password}')`;
    return connection.execute(query);
};

export const updateToken = (token, id) => {
    const query = `UPDATE users SET refresh_token = '${token}' WHERE id = ${id}`;
    return connection.execute(query);
};

export const findRefToken = (token) => {
    const query = `SELECT * FROM users WHERE refresh_token = '${token}'`;
    return connection.execute(query);
};

export const nullToken = (id) => {
    const query = `UPDATE users SET refresh_token = null WHERE id = ${id}`;
    return connection.execute(query);
};
