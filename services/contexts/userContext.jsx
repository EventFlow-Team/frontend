import React, { createContext, useContext, useState, useEffect } from 'react';
import Api from '../api'; 

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState();

    const getUser = async () => {
        await Api.get('/user')
            .then(response => {
                setUser(response.data.user)
                console.log(user);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, getUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser tem que ser usado com um UserProvider');
    }
    return context;
}
