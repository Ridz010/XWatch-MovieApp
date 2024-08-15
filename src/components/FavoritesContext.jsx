// FavoritesContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            if (!prev.some(fav => fav.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== id));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);