import React, { useState, useEffect } from 'react';

interface Favorite {
    name: string;
    lat: number;
    lon: number;
}

interface FavoritesListProps {
    currentLat: number;
    currentLon: number;
    onSelect: (lat: number, lon: number) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ currentLat, currentLon, onSelect }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('tide_favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const saveFavoritesToStorage = (newFavorites: Favorite[]) => {
        localStorage.setItem('tide_favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const saveLocation = () => {
        if (favorites.length >= 3) {
            alert("Max 3 favorites!");
            return;
        }

        const name = prompt("Name this location:");
        if (name) {
            const newFavorite = { name, lat: currentLat, lon: currentLon };
            const updatedFavorites = [...favorites, newFavorite];
            saveFavoritesToStorage(updatedFavorites);
        }
    };

    const removeLocation = (index: number) => {
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        saveFavoritesToStorage(updatedFavorites);
    };

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            color: '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '20px',
            marginBottom: '20px' // Added for spacing with chart
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>⭐ Favorites</h3>
                <button
                    onClick={saveLocation}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Save Current Location
                </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {favorites.length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>No favorites saved.</p>}

                {favorites.map((fav, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#333',
                        color: '#fff',
                        borderRadius: '20px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}>
                        <span
                            onClick={() => onSelect(fav.lat, fav.lon)}
                            style={{ marginRight: '8px', fontWeight: 500 }}
                        >
                            {fav.name}
                        </span>
                        <button
                            onClick={() => removeLocation(index)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#aaa',
                                fontSize: '1rem',
                                lineHeight: 1,
                                padding: 0,
                                marginLeft: '4px'
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
