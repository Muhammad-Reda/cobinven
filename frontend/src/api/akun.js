import axios from "axios";

export const getDataAkun = async ({ token }) => {
    const response = await axios.get("http://localhost:4000/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const tambahAkun = async ({ token, username, password }) => {
    const response = await axios.post(
        "http://localhost:4000/users",
        {
            username,
            password,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const editAkun = async ({ username, password, id, token }) => {
    const response = await axios.patch(
        "http://localhost:4000/users/" + id,
        {
            username,
            password,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const deleteAkun = async ({ token, id }) => {
    const response = await axios.delete("http://localhost:4000/users/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};
