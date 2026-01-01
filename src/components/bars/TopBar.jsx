import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Chip,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';

const GlassAppBar = styled(AppBar)({
  background: 'rgba(31, 58, 95, 0.85)', // Navy blue - trust & authority
  backdropFilter: 'blur(30px) saturate(150%)',
  borderBottom: '1px solid rgba(31, 58, 95, 0.95)',
  boxShadow: '0 2px 20px rgba(31, 58, 95, 0.6)',
});

const GlassChip = styled(Chip)({
  background: 'rgba(79, 163, 165, 0.75)', // Soft teal - caring & approachable
  backdropFilter: 'blur(15px) saturate(150%)',
  border: '1px solid rgba(79, 163, 165, 0.95)',
  color: '#fff',
  fontWeight: 500,
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: '#fff',
    },
  },
});

const GlassTabs = styled(Tabs)({
  background: 'rgba(79, 163, 165, 0.7)', // Soft teal
  backdropFilter: 'blur(20px) saturate(150%)',
  border: '1px solid rgba(79, 163, 165, 0.9)',
  borderRadius: '24px',
  padding: '4px',
  minHeight: '44px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const GlassTab = styled(Tab)({
  color: 'rgba(255, 255, 255, 0.8)',
  textTransform: 'none',
  minHeight: '36px',
  borderRadius: '20px',
  minWidth: '100px',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    color: '#fff',
    background: 'rgba(31, 58, 95, 0.9)', // Navy blue
    backdropFilter: 'blur(10px) saturate(150%)',
  },
  '&:hover': {
    background: 'rgba(31, 58, 95, 0.75)',
    color: '#fff',
  },
});

const ThemeToggleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(244, 162, 97, 0.7)', // Warm peach - empathy & connection
  backdropFilter: 'blur(20px) saturate(150%)',
  border: '1px solid rgba(244, 162, 97, 0.9)',
  borderRadius: '50px',
  padding: '4px 16px 4px 4px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(244, 162, 97, 0.85)',
  },
});

const ThemeToggleButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: active ? 'rgba(255, 209, 102, 0.9)' : 'transparent', // Golden yellow when active
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: active ? 'scale(1.1)' : 'scale(1)',
}));

function TopBar({ darkMode, onThemeToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Sync active tab with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') {
      setActiveTab(0);
    } else if (path === '/maps') {
      setActiveTab(1);
    }
  }, [location.pathname]);

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
    // Navigate to the corresponding route
    if (newValue === 0) {
      navigate('/');
    } else if (newValue === 1) {
      navigate('/maps');
    }
  };

  return (
    <GlassAppBar position="fixed" sx={{ zIndex: 1000 }}>
      <Toolbar>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'rgba(79, 163, 165, 1)', // Soft teal
              color: '#fff',
              fontWeight: 600,
              border: '2px solid rgba(31, 58, 95, 1)', // Navy blue border
            }}
          >
            U
          </Avatar>

          {/* Theme Toggle - Moon/Sun Switch */}
          <ThemeToggleContainer onClick={onThemeToggle}>
            <ThemeToggleButton active={!darkMode}>
              <LightModeIcon 
                sx={{ 
                  color: '#fff',
                  fontSize: '20px',
                  opacity: !darkMode ? 1 : 0.5,
                }} 
              />
            </ThemeToggleButton>
            <ThemeToggleButton active={darkMode}>
              <DarkModeIcon 
                sx={{ 
                  color: '#fff',
                  fontSize: '20px',
                  opacity: darkMode ? 1 : 0.5,
                }} 
              />
            </ThemeToggleButton>
            <Typography 
              sx={{ 
                color: '#fff', 
                fontSize: '0.9rem',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              Settings
            </Typography>
          </ThemeToggleContainer>
        </Box>

        {/* Center Section */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <GlassChip
            avatar={
              <Avatar sx={{ bgcolor: 'rgba(255, 209, 102, 1)' }}> {/* Golden yellow accent */}
                M
              </Avatar>
            }
            label="Locate your child's next destination"
            onDelete={() => {}}
            deleteIcon={<CloseIcon />}
            sx={{ px: 2, py: 2.5 }}
          />
        </Box>

        {/* Right Section - Slider Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GlassTabs value={activeTab} onChange={handleTabChange}>
            <GlassTab label="Dashboard" />
            <GlassTab label="Map" />
          </GlassTabs>
          
          <IconButton 
            sx={{ 
              color: '#fff',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
}

export default TopBar;