import React, { createContext, useContext, useState, useEffect } from 'react';
import Api from '../api'; 

const UserEventsContext = createContext(undefined);

export function UserEventsProvider({ children }) {
    const [userEvent, setUserEvent] = useState();

    const getUserEvents = async () => {
        await Api.get('/event/user')
            .then(response => {
                setUserEvent(response.data.events)
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getUserEvents();
    }, []);

    return (
        <UserEventsContext.Provider value={{ userEvent, getUserEvents }}>
            {children}
        </UserEventsContext.Provider>
    );
}

export function useUserEvents() {
    const context = useContext(UserEventsContext);
    if (context === undefined) {
        throw new Error('useUserEvents tem que ser usado com um UserEventsProvider');
    }
    return context;
}
