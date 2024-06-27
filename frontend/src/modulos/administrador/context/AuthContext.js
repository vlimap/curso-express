import React, { Children, createContext, useEffect, useState} from 'react';

import Loginadiministrador from '../services/LoginAdministrador';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({token: null, isAuthenticated: false});
    useEffect(() => {
        const token = Loginadiministrador.getCurrentUser();
        if(token){
            setAuth({token, isAuthenticated : true})
            }
        },[]);

        const login = async ( email, senha) =>{
        try {
            await Loginadiministrador.Loginadiministrador(email, senha);
            setAuth({token: Loginadiministrador.getCurrentUser(), isAuthenticated: true});
        } catch (error) {
            throw new Error(error, 'Erro ao logar');
        }
    };
    const logout = () =>{
        Loginadiministrador.logout();
        setAuth({token:null, isAuthenticated: false});
    };

    return (
        <AuthContext.Provider value={(auth, login, logout)}>
            {children}
        </AuthContext.Provider>
    );
};

