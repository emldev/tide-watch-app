import React, { useState } from 'react';

interface LocationControlsProps {
    onLocationSelect: (lat: number, lon: number) => void;
}

const LocationControls: React.FC<LocationControlsProps> = ({ onLocationSelect }) => {
    const [inputLat, setInputLat] = useState<string>('');
    const [inputLon, setInputLon] = useState<string>('');

    const handleNearMe = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // ONLY update local state, do not trigger parent update yet
                setInputLat(position.coords.latitude.toFixed(6));
                setInputLon(position.coords.longitude.toFixed(6));
            },
            () => {
                alert('Could not get location');
            }
        );
    };

    const handleGo = () => {
        const lat = parseFloat(inputLat);
        const lon = parseFloat(inputLon);

        if (!isNaN(lat) && !isNaN(lon)) {
            onLocationSelect(lat, lon);
        } else {
            alert('Please enter valid coordinates');
        }
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#007AFF',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px', // 4px as requested in text, user prompt said 6px in previous turn but 4px here. Following latest prompt.
        cursor: 'pointer',
    };

    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
                onClick={handleNearMe}
                style={{ ...buttonStyle, marginRight: '10px' }}
            >
                📍 Near Me
            </button>

            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Lat"
                    value={inputLat}
                    onChange={(e) => setInputLat(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px' }}
                />
                <input
                    type="text"
                    placeholder="Lon"
                    value={inputLon}
                    onChange={(e) => setInputLon(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px' }}
                />
                <button
                    onClick={handleGo}
                    style={buttonStyle}
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default LocationControls;
