import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const timeoutRef = useRef(null);

    const showLoading = (message = 'Loading...') => {
        setLoadingMessage(message);
        setIsLoading(true);
        
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        // Set a safety timeout (10 seconds)
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage('Loading...');
        }, 10000);
    };

    const hideLoading = () => {
        setIsLoading(false);
        setLoadingMessage('Loading...');
        
        // Clear the timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const value = {
        isLoading,
        loadingMessage,
        showLoading,
        hideLoading
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {isLoading && <LoadingScreen message={loadingMessage} />}
        </LoadingContext.Provider>
    );
}; 