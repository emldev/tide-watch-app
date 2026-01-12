import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TideChart from './components/TideChart';
import LocationControls from './components/LocationControls';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';

interface TideData {
  timestamp: string;
  height_m: number;
}

function App() {
  const [tideData, setTideData] = useState<TideData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [coords, setCoords] = useState({ lat: -33.8, lon: 151.2 });
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    const fetchTides = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tides?lat=${coords.lat}&lon=${coords.lon}`);
        setTideData(response.data.data);

        // Save to cache on success
        localStorage.setItem('tideData', JSON.stringify(response.data.data));
        setIsOffline(false);
      } catch (error) {
        console.error('Error fetching tide data:', error);

        // Fallback to cache on error
        const cached = localStorage.getItem('tideData');
        if (cached) {
          try {
            setTideData(JSON.parse(cached));
            setIsOffline(true);
          } catch (parseError) {
            console.error("Failed to parsing cached data", parseError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTides();
  }, [coords]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Tide Watch ({coords.lat.toFixed(2)}, {coords.lon.toFixed(2)})</h1>

      {isOffline && (
        <div style={{
          backgroundColor: '#ffcc00',
          color: '#333',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          ⚠️ Offline Mode - Showing Cached Data
        </div>
      )}

      <LocationControls onLocationSelect={(lat, lon) => setCoords({ lat, lon })} />

      <FavoritesList
        currentLat={coords.lat}
        currentLon={coords.lon}
        onSelect={(lat, lon) => setCoords({ lat, lon })}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TideChart data={tideData} />
      )}

      <Footer />
    </div>
  );
}

export default App;
