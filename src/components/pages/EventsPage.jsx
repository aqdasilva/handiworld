import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Avatar, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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

// Sample data for events
const rows = [
  {
    id: 1,
    name: 'Special Needs Family Fun Day',
    date: '2024-02-15',
    time: '10:00 AM - 2:00 PM',
    location: 'Community Center',
    type: 'Social',
    ageRange: 'All ages',
    cost: 'Free',
  },
  {
    id: 2,
    name: 'Sensory-Friendly Movie Screening',
    date: '2024-02-18',
    time: '11:00 AM - 1:00 PM',
    location: 'AMC Theater Downtown',
    type: 'Entertainment',
    ageRange: '5-12 years',
    cost: '$5 per person',
  },
  {
    id: 3,
    name: 'Adaptive Sports Day',
    date: '2024-02-22',
    time: '9:00 AM - 3:00 PM',
    location: 'City Park',
    type: 'Sports',
    ageRange: '8-18 years',
    cost: 'Free',
  },
  {
    id: 4,
    name: 'Parent Support Group Meeting',
    date: '2024-02-25',
    time: '7:00 PM - 9:00 PM',
    location: 'Library Community Room',
    type: 'Support',
    ageRange: 'Parents only',
    cost: 'Free',
  },
  {
    id: 5,
    name: 'Autism Awareness Workshop',
    date: '2024-03-01',
    time: '6:00 PM - 8:00 PM',
    location: 'School Auditorium',
    type: 'Educational',
    ageRange: 'All ages',
    cost: 'Free',
  },
  {
    id: 6,
    name: 'Art Therapy Session',
    date: '2024-03-05',
    time: '3:00 PM - 5:00 PM',
    location: 'Arts Center',
    type: 'Therapy',
    ageRange: '5-15 years',
    cost: '$10 per session',
  },
  {
    id: 7,
    name: 'Inclusive Dance Class',
    date: '2024-03-08',
    time: '4:00 PM - 5:30 PM',
    location: 'Dance Studio',
    type: 'Recreation',
    ageRange: '6-16 years',
    cost: '$15 per class',
  },
  {
    id: 8,
    name: 'Special Olympics Fundraiser',
    date: '2024-03-12',
    time: '12:00 PM - 4:00 PM',
    location: 'Fairgrounds',
    type: 'Fundraiser',
    ageRange: 'All ages',
    cost: 'Donations welcome',
  },
];

const columns = [
  {
    field: 'name',
    headerName: 'Event Name',
    width: 250,
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
          <EventIcon sx={{ fontSize: '18px' }} />
        </Avatar>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 130,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: '16px', color: 'rgba(255, 209, 102, 1.0)' }} />
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem' }}>
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 150,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 200,
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
    field: 'type',
    headerName: 'Type',
    width: 130,
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
    field: 'ageRange',
    headerName: 'Age Range',
    width: 130,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          background: params.value === 'Free'
            ? 'rgba(255, 209, 102, 0.9)' // Golden yellow
            : 'rgba(244, 162, 97, 0.7)', // Warm peach
          backdropFilter: 'blur(10px) saturate(150%)',
          border: params.value === 'Free'
            ? '1px solid rgba(255, 209, 102, 0.95)'
            : '1px solid rgba(244, 162, 97, 0.9)',
          color: '#fff',
          fontSize: '0.8rem',
          fontWeight: 600,
        }}
      />
    ),
  },
];

function EventsPage() {
  const [searchText, setSearchText] = useState('');

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;

    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.location.toLowerCase().includes(searchLower) ||
        row.type.toLowerCase().includes(searchLower) ||
        row.ageRange.toLowerCase().includes(searchLower)
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
            <EventIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}
            >
              Events & Activities
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Discover upcoming events and activities for children with special needs
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`${filteredRows.length} of ${rows.length} Events`}
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
          placeholder="Search by name, location, type, or age range..."
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

export default EventsPage;
