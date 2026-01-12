import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            width: '100%',
            padding: '20px',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.8rem',
            borderTop: '1px solid #333',
            marginTop: '30px'
        }}>
            <p style={{ margin: '5px 0' }}>Data provided by Open-Meteo API</p>
            <p style={{ margin: '5px 0' }}>⚠️ Prediction only. Do NOT use for navigation.</p>
        </footer>
    );
};

export default Footer;
