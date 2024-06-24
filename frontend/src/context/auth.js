import React, { createContext, useState } from "react";

const AuthContext = createContext({
    token: null,
    setToken: null,
});

export default AuthContext;
