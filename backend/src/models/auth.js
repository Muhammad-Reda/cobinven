import connection from "../config/databse.js";

export const getUserByUsername = (username) => {
    const query = "SELECT * FROM users WHERE `username` = ?";
    return connection.execute(query, [username]);
};

export const register = (username, password) => {
    const query = `INSERT INTO users (username, password) VALUES('${username}', '${password}')`;
    return connection.execute(query);
};
