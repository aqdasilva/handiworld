import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Paper, IconButton, Typography, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon with glassmorphism style
const createCustomIcon = (color = '#6366f1', letter = 'C') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transform: rotate(-45deg);
      ">
        <span style="transform: rotate(45deg)">${letter}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const GlassContainer = styled(Box)({
  width: '100%',
  height: '100%',
  borderRadius: '24px',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
});

const GlassControls = styled(Paper)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 1000,
  background: 'rgba(20, 40, 60, 0.25)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
});

const GlassButton = styled(IconButton)({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  color: '#fff',
  width: '44px',
  height: '44px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)',
    transform: 'scale(1.05)',
  },
});

const LocationInfo = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  zIndex: 1000,
  background: 'rgba(20, 40, 60, 0.25)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '16px 20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

// Helper component for map controls
function MapControls({ onZoomIn, onZoomOut, onRecenter }) {
  return (
    <GlassControls elevation={0}>
      <GlassButton onClick={onRecenter} size="small">
        <MyLocationIcon />
      </GlassButton>
      <GlassButton onClick={onZoomIn} size="small">
        <ZoomInIcon />
      </GlassButton>
      <GlassButton onClick={onZoomOut} size="small">
        <ZoomOutIcon />
      </GlassButton>
    </GlassControls>
  );
}

// Helper component to control map from inside
function MapController({ center, zoom }) {
  const map = useMap();
  
  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleRecenter = () => map.setView(center, zoom);
  
  return (
    <MapControls 
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onRecenter={handleRecenter}
    />
  );
}

function Maps() {
  // Default center (New York City) - you can change this
  const [center] = useState([40.7128, -74.0060]);
  const [zoom] = useState(13);

  // Sample locations - replace with your actual data
  const locations = [
    {
      id: 1,
      position: [40.7128, -74.0060],
      name: "Child Location",
      description: "Current location",
      letter: "C",
      color: "#6366f1",
    },
    {
      id: 2,
      position: [40.7589, -73.9851],
      name: "Home",
      description: "Home address",
      letter: "H",
      color: "#22c55e",
    },
    {
      id: 3,
      position: [40.7480, -73.9862],
      name: "School",
      description: "School location",
      letter: "S",
      color: "#f59e0b",
    },
  ];

  return (
    <GlassContainer>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
        zoomControl={false}
      >
        {/* OpenStreetMap tiles - completely free */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Alternative tile layers (uncomment to use):
        
        CartoDB Dark Matter:
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        CartoDB Voyager:
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        */}

        {/* Markers for each location */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={createCustomIcon(location.color, location.letter)}
          >
            <Popup>
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location.description}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Map Controls */}
        <MapController center={center} zoom={zoom} />
      </MapContainer>

      {/* Location Info Card */}
      <LocationInfo>
        <Avatar
          sx={{
            bgcolor: 'rgba(99, 102, 241, 0.8)',
            width: 36,
            height: 36,
          }}
        >
          C
        </Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: '#fff', fontWeight: 600, mb: 0.5 }}
          >
            Child's Location
          </Typography>
          <Chip
            label="Last updated: 2 min ago"
            size="small"
            sx={{
              background: 'rgba(34, 197, 94, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#fff',
              fontSize: '0.7rem',
              height: '20px',
            }}
          />
        </Box>
      </LocationInfo>
    </GlassContainer>
  );
}

export default Maps;