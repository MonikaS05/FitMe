// src/context/AuthContext.jsx

// CRITICAL FIX: Import useCallback
import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    });

    // FIX: Wrap loadUser in useCallback to stabilize the function reference.
    // Dependencies: authState is needed because setAuthState relies on its previous state (...authState).
    const loadUser = useCallback(async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth');
            setAuthState(prevAuthState => ({ // Use functional update form for safer state updates
                ...prevAuthState,
                isAuthenticated: true,
                loading: false,
                user: res.data,
                token: localStorage.token
            }));
        } catch (err) {
            localStorage.removeItem('token');
            setAuthState(prevAuthState => ({
                ...prevAuthState,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            }));
        }
    }, []); // Empty dependency array because we now use the functional update form (prevAuthState)

    // FIX: Wrap login in useCallback
    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
        // loadUser does not need to be a dependency if it's stable (which it now is).
        loadUser(); 
    }, [loadUser]);

    // FIX: Wrap logout in useCallback
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setAuthState({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                loadUser, // Stable reference
                login,    // Stable reference
                logout,   // Stable reference
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};