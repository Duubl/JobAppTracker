import React, { createContext, useContext, useState } from 'react';
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

    const showLoading = (message = 'Loading...') => {
        setLoadingMessage(message);
        setIsLoading(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
        setLoadingMessage('Loading...');
    };

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