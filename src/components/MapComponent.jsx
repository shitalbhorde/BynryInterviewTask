import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ClipLoader } from 'react-spinners';

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center]);
  return null;
}

function MapComponent({ profile }) {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!profile?.location) return;
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(profile.location)}&format=json`
        );
        const data = await response.json();
        
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError('Location not found.');
        }
      } catch (err) {
        setError('Failed to fetch location. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [profile?.location]);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <ClipLoader color="#0d6efd" size={50} />
          <p className="mt-3">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Location: {profile.location}</h5>
        <div style={{ height: '400px' }}>
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
            <Marker position={position}>
               <Popup>
                 {profile.name}<br />
                 {profile.location}
               </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;