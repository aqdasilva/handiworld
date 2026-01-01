import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const GlassSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ collapsed }) => ({
  position: 'fixed',
  left: 0,
  top: 64, // Below the AppBar
  height: 'calc(100vh - 64px)',
  width: collapsed ? '70px' : '240px',
  background: 'rgba(31, 58, 95, 0.85)', // Navy blue - trust & stability
  backdropFilter: 'blur(30px) saturate(150%)',
  borderRight: '1px solid rgba(31, 58, 95, 0.95)',
  boxShadow: '2px 0 20px rgba(31, 58, 95, 0.6)',
  zIndex: 100,
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
}));

const menuItems = [
  { id: 1, title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { id: 2, title: 'Teams', icon: <GroupsIcon />, path: '/teams' },
  { id: 3, title: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' },
  { id: 4, title: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { id: 5, title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Determine active item based on current path
  const getActiveItem = () => {
    const activeMenuItem = menuItems.find(item => item.path === location.pathname);
    return activeMenuItem ? activeMenuItem.id : 1;
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
            bgcolor: 'rgba(255, 209, 102, 0.9)', // Golden yellow
            '&:hover': {
              bgcolor: 'rgba(242, 201, 76, 1)', // Darker golden yellow
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
                selected={getActiveItem() === item.id}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'initial',
                  px: 2.5,
                  py: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    bgcolor: 'rgba(79, 163, 165, 0.7)', // Soft teal hover
                    color: '#fff',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(79, 163, 165, 0.85)', // Soft teal selected
                    color: '#fff',
                    borderLeft: '4px solid rgba(255, 209, 102, 1)', // Golden yellow accent
                    '&:hover': {
                      bgcolor: 'rgba(79, 163, 165, 0.95)',
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
                      fontWeight: getActiveItem() === item.id ? 600 : 400,
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