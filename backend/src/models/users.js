import connection from "../config/databse.js";

export const getAllUsers = () => {
    const query = "SELECT id, username FROM users";
    return connection.execute(query);
};

export const getUser = (id) => {
    const query = `SELECT id, username FROM users WHERE id = ?`;
    return connection.execute(query, [id]);
};

export const createUser = (data) => {
    const query = `INSERT INTO users (username, password) VALUES ('${data.username}', '${data.password}')`;
    return connection.execute(query);
};

export const updateUser = (username, password, id) => {
    const query =
        "UPDATE users SET `username` = ?, `password` = ?  WHERE id = ?";
    return connection.execute(query, [username, password, id]);
};

export const deleteUser = (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`;
    return connection.execute(query);
};
