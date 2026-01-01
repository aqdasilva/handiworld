import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Avatar, TextField, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import AccessibleIcon from '@mui/icons-material/Accessible';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';

const GlassContainer = styled(Box)({
  position: 'absolute',
  top: 80,
  left: 90,
  right: 20,
  bottom: 20,
  zIndex: 10,
  padding: '24px',
  pointerEvents: 'auto',
});

const GlassHeader = styled(Paper)({
  background: 'rgba(31, 58, 95, 0.85)', // Navy blue - trust & authority
  backdropFilter: 'blur(30px) saturate(150%)',
  border: '1px solid rgba(31, 58, 95, 0.9)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '20px',
  boxShadow: '0 4px 20px rgba(31, 58, 95, 0.5)',
});

const GlassSearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(79, 163, 165, 0.8)', // Soft teal
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(79, 163, 165, 0.9)',
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const GlassDataGrid = styled(Paper)({
  background: 'rgba(31, 58, 95, 0.85)', // Navy blue - trust & authority
  backdropFilter: 'blur(30px) saturate(150%)',
  border: '1px solid rgba(31, 58, 95, 0.9)',
  borderRadius: '16px',
  padding: '16px',
  boxShadow: '0 4px 20px rgba(31, 58, 95, 0.5)',
  height: 'calc(100% - 200px)',
  '& .MuiDataGrid-root': {
    border: 'none',
    color: '#fff',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    fontWeight: 600,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  '& .MuiTablePagination-root': {
    color: '#fff',
  },
  '& .MuiDataGrid-selectedRowCount': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiIconButton-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
});

// Sample data for handicap-friendly places
const rows = [
  {
    id: 1,
    name: 'Sunshine Park',
    address: '123 Main St, New York, NY 10001',
    category: 'Park',
    features: 'Wheelchair ramps, accessible playground',
    phone: '(555) 123-4567',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'ABC Community Center',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    category: 'Community Center',
    features: 'Elevators, accessible restrooms, sensory room',
    phone: '(555) 234-5678',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Kids Fun Zone',
    address: '789 Park Blvd, Queens, NY 11354',
    category: 'Play Area',
    features: 'Wheelchair accessible, adaptive swings',
    phone: '(555) 345-6789',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'City Library - Main Branch',
    address: '321 Library Ln, Manhattan, NY 10016',
    category: 'Library',
    features: 'Accessible entrance, braille books, quiet spaces',
    phone: '(555) 456-7890',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Ocean View Beach',
    address: '654 Beach Rd, Staten Island, NY 10301',
    category: 'Beach',
    features: 'Beach wheelchairs, accessible boardwalk',
    phone: '(555) 567-8901',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Rainbow Therapy Center',
    address: '987 Wellness Dr, Bronx, NY 10451',
    category: 'Therapy Center',
    features: 'Full accessibility, specialized equipment',
    phone: '(555) 678-9012',
    rating: 5.0,
  },
  {
    id: 7,
    name: 'Children\'s Museum',
    address: '147 Museum Way, Manhattan, NY 10018',
    category: 'Museum',
    features: 'Wheelchair accessible, sensory-friendly hours',
    phone: '(555) 789-0123',
    rating: 4.8,
  },
  {
    id: 8,
    name: 'Green Meadows Park',
    address: '258 Nature Trail, Queens, NY 11375',
    category: 'Park',
    features: 'Paved paths, accessible picnic areas',
    phone: '(555) 890-1234',
    rating: 4.7,
  },
];

// Function to open maps with address
const openMaps = (address) => {
  const encodedAddress = encodeURIComponent(address);

  // Detect device type
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isIOS) {
    // Open in Apple Maps
    window.open(`maps://maps.google.com/maps?daddr=${encodedAddress}&amp;ll=`);
  } else if (isAndroid) {
    // Open in Google Maps
    window.open(`geo:0,0?q=${encodedAddress}`);
  } else {
    // Open in Google Maps web version
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  }
};

const columns = [
  {
    field: 'name',
    headerName: 'Place Name',
    width: 220,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'rgba(79, 163, 165, 1.0)', // Soft teal
            fontSize: '0.9rem',
          }}
        >
          <AccessibleIcon sx={{ fontSize: '18px' }} />
        </Avatar>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 280,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOnIcon sx={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }} />
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          background: 'rgba(79, 163, 165, 0.75)', // Soft teal
          backdropFilter: 'blur(10px) saturate(150%)',
          border: '1px solid rgba(79, 163, 165, 0.9)',
          color: '#fff',
          fontSize: '0.8rem',
        }}
      />
    ),
  },
  {
    field: 'features',
    headerName: 'Accessibility Features',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 140,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon sx={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }} />
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 600 }}>
          ★
        </Typography>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'directions',
    headerName: 'Directions',
    width: 120,
    renderCell: (params) => (
      <IconButton
        size="small"
        onClick={() => openMaps(params.row.address)}
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(255, 209, 102, 0.9)', // Golden yellow
          '&:hover': {
            backgroundColor: 'rgba(255, 209, 102, 0.95)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <DirectionsIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    ),
  },
];

function HandicapFriendlyPlacesPage() {
  const [searchText, setSearchText] = useState('');

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;

    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.address.toLowerCase().includes(searchLower) ||
        row.category.toLowerCase().includes(searchLower) ||
        row.features.toLowerCase().includes(searchLower)
      );
    });
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <GlassContainer>
      <GlassHeader elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(79, 163, 165, 1.0)', // Soft teal
              width: 48,
              height: 48,
            }}
          >
            <AccessibleIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}
            >
              Accessible Places
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Find handicap-friendly locations with accessibility features
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`${filteredRows.length} of ${rows.length} Places`}
              sx={{
                background: 'rgba(79, 163, 165, 0.75)', // Soft teal
                backdropFilter: 'blur(10px) saturate(150%)',
                border: '1px solid rgba(79, 163, 165, 0.9)',
                color: '#fff',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        {/* Search Field */}
        <GlassSearchField
          fullWidth
          placeholder="Search by name, address, category, or features..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <ClearIcon
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  onClick={handleClearSearch}
                />
              </InputAdornment>
            ),
          }}
        />
      </GlassHeader>

      <GlassDataGrid elevation={0}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: 'none',
          }}
        />
      </GlassDataGrid>
    </GlassContainer>
  );
}

export default HandicapFriendlyPlacesPage;
