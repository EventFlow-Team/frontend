import React, { createContext, useContext, useState, useEffect } from 'react';
import Api from '../api';

const ratingContext = createContext(undefined);

export function RatingProvider({ children }) {
    const [rating, setRating] = useState([]);

    const getEventRating = async ({ item }) => {
        if (rating.length === 0) return 0;

        const totalRating = rating.reduce((acc, rating) => acc + (rating.rating || 0), 0);
        const averageRating = totalRating / rating.length;

        return Math.min(averageRating, 5).toFixed(1);
    };

    useEffect(() => {
        getEventRating();
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
