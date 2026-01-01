import { Box } from '@mui/material';
import Maps from '../Maps'; // Adjust path based on where you put Maps.jsx

function MapsPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        marginLeft: '80px', // Account for sidebar
        marginTop: '80px', // Account for topbar
        height: 'calc(100vh - 100px)',
        padding: '20px',
      }}
    >
      <Maps />
    </Box>
  );
}

export default MapsPage;