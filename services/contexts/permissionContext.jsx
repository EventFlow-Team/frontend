import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ImagePicker from "expo-image-picker";

const PermissionContext = createContext(undefined);

export function PermissionProvider({ children }) {
    const [permission, setPermission] = useState();

    const getPermission = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermission(galleryStatus);
    };

    return (
        <PermissionContext.Provider value={{ permission, getPermission }}>
            {children}
        </PermissionContext.Provider>
    );
}

export function usePermission() {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermission tem que ser usado com um PermissionProvider');
    }
    return context;
}
