import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Cloud } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Scene3D from './components/Scene3D';
import FloatingCards from './components/FloatingCards';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4a8a52',
      },
      secondary: {
        main: '#87CEEB',
      },
      background: {
        default: darkMode ? '#1a1a1a' : '#f5f5f5',
        paper: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'relative', 
          overflow: 'hidden',
          backgroundColor: darkMode ? '#1a1a1a' : '#e3f2fd',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Top Navigation Bar */}
        <TopBar darkMode={darkMode} onThemeToggle={handleThemeToggle} />
        
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* 3D Canvas Background */}
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        >
          <Suspense fallback={null}>
            {/* Lighting - softer and more realistic */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.2} />
            <hemisphereLight args={['#b8d4e8', '#6b8e6f', 0.4]} />
            
            {/* Sky and Environment - softer colors */}
            <Sky 
              sunPosition={[100, 20, 100]} 
              turbidity={8}
              rayleigh={0.5}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />
            <Cloud 
              opacity={0.25} 
              speed={0.15} 
              width={10} 
              depth={1.5} 
              segments={20}
              position={[0, 5, -10]}
            />
            
            {/* Ground/Landscape */}
            <Scene3D />
            
            {/* Camera Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
        
        {/* Floating UI Cards Overlay */}
        <FloatingCards />
      </Box>
    </ThemeProvider>
  );
}

export default App;