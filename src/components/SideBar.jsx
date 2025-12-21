import { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const GlassSidebar = styled(Box)(({ collapsed }) => ({
  position: 'fixed',
  left: 0,
  top: 64, // Below the AppBar
  height: 'calc(100vh - 64px)',
  width: collapsed ? '70px' : '240px',
  background: 'rgba(20, 40, 60, 0.35)', // Darker background
  backdropFilter: 'blur(30px) saturate(180%)',
  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '2px 0 20px rgba(0, 0, 0, 0.2)',
  zIndex: 100,
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden', // Changed from overflowX/Y
  // Hide scrollbar
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE/Edge
}));

const menuItems = [
  { id: 1, title: 'Dashboard', icon: <DashboardIcon /> },
  { id: 2, title: 'Teams', icon: <GroupsIcon /> },
  { id: 3, title: 'Calendar', icon: <CalendarMonthIcon /> },
  { id: 4, title: 'Analytics', icon: <BarChartIcon /> },
  { id: 5, title: 'Settings', icon: <SettingsIcon /> },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState(1);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <GlassSidebar collapsed={collapsed}>
      {/* Toggle Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: '#fff',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.id}
            title={collapsed ? item.title : ''}
            placement="right"
            arrow
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'initial',
                  px: 2.5,
                  py: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                    color: '#fff',
                    borderLeft: '4px solid #fff',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 3,
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: collapsed ? 0 : 1,
                    transition: 'opacity 0.3s',
                    '& .MuiTypography-root': {
                      fontWeight: activeItem === item.id ? 600 : 400,
                      fontSize: '0.95rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </GlassSidebar>
  );
}

export default Sidebar;