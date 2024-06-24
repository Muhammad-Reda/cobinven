import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:4000/token");
            setToken(response.data.accessToken);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
