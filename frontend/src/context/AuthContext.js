import React, { Children, createContext, useEffect, useState} from 'react';

import LoginUsuario from '../services/LoginUsuario';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({token: null, isAuthenticated: false});
    useEffect(() => {
        const token = LoginUsuario.getCurrentUser();
        if(token){
            setAuth({token, isAuthenticated : true})
            }
        },[]);

        const login = async ( email, senha) =>{
        try {
            await LoginUsuario.LoginUsuario(email, senha);
            setAuth({token: LoginUsuario.getCurrentUser(), isAuthenticated: true});
        } catch (error) {
            throw new Error(error, 'Erro ao logar');
        }
    };
    const logout = () =>{
        LoginUsuario.logout();
        setAuth({token:null, isAuthenticated: false});
    };

    return (
        <AuthContext.Provider value={(auth, login, logout)}>
            {children}
        </AuthContext.Provider>
    );
};

