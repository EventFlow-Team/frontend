import React, { createContext, useContext, useState, useEffect } from 'react';
import Api from '../api'; 

const UserLinesContext = createContext(undefined);

export function UserLinesProvider({ children }) {
    const [userLine, setUserLine] = useState([]);

    const getUserLines = async () => {
        await Api.get('/line/user')
            .then(response => {
                setUserLine(response.data.line)
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getUserLines();
    }, []);

    return (
        <UserLinesContext.Provider value={{ userLine, getUserLines }}>
            {children}
        </UserLinesContext.Provider>
    );
}

export function useUserLines() {
    const context = useContext(UserLinesContext);
    if (context === undefined) {
        throw new Error('useUserLines tem que ser usado com um UserLinesProvider');
    }
    return context;
}
