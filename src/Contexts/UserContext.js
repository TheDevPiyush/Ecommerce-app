import { getAuth } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import FetchUserData from '../services/FetchUserData'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)



    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    setError(false);
                    const data = await FetchUserData(user.uid);
                    setUserData(data);
                } catch (error) {
                    setError(true);
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUserData(null);
                setError(false);
            }
            setError(false)
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ userData, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};