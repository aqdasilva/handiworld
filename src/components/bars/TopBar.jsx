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
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';

const GlassAppBar = styled(AppBar)({
  background: 'rgba(20, 40, 60, 0.25)',
  backdropFilter: 'blur(30px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
});

const GlassChip = styled(Chip)({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
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
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
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
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
});

// Theme Toggle Switch styled like the screenshot
const ThemeToggleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '50px',
  padding: '4px 16px 4px 4px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)',
  },
});

const ThemeToggleButton = styled(Box)(({ active }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: active ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: active ? 'scale(1.1)' : 'scale(1)',
}));

function TopBar({ darkMode, onThemeToggle }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 600,
              border: '2px solid rgba(255, 255, 255, 0.3)',
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
              <Avatar sx={{ bgcolor: 'rgba(100, 150, 250, 0.7)' }}>
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