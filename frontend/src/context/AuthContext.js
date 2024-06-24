import React, { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuth = () => {
    const { token, setToken } = useContext(AuthContext);

    return { token, setToken };
};

export default useAuth;
