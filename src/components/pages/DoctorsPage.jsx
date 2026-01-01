import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Avatar, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

// Sample data for doctors
const rows = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrician',
    phone: '(555) 123-4567',
    location: 'Children\'s Medical Center',
    experience: '15 years',
    availability: 'Available',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    phone: '(555) 234-5678',
    location: 'Brain & Spine Institute',
    experience: '20 years',
    availability: 'Available',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Physical Therapist',
    phone: '(555) 345-6789',
    location: 'Rehabilitation Center',
    experience: '12 years',
    availability: 'Busy',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Dr. James Williams',
    specialty: 'Orthopedic Surgeon',
    phone: '(555) 456-7890',
    location: 'Orthopedic Clinic',
    experience: '18 years',
    availability: 'Available',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Speech Therapist',
    phone: '(555) 567-8901',
    location: 'Communication Center',
    experience: '10 years',
    availability: 'Available',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    specialty: 'Occupational Therapist',
    phone: '(555) 678-9012',
    location: 'Therapy Associates',
    experience: '14 years',
    availability: 'Busy',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Dr. Amanda Taylor',
    specialty: 'Developmental Pediatrician',
    phone: '(555) 789-0123',
    location: 'Child Development Center',
    experience: '16 years',
    availability: 'Available',
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Dr. David Kim',
    specialty: 'Psychiatrist',
    phone: '(555) 890-1234',
    location: 'Mental Health Clinic',
    experience: '13 years',
    availability: 'Available',
    rating: 4.7,
  },
];

const columns = [
  {
    field: 'name',
    headerName: 'Doctor Name',
    width: 200,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'rgba(79, 163, 165, 1.0)', // Soft teal - caring & approachable
            fontSize: '0.9rem',
          }}
        >
          {params.value.split(' ')[1][0]}
        </Avatar>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'specialty',
    headerName: 'Specialty',
    width: 200,
    renderCell: (params) => (
      <Chip
        icon={<LocalHospitalIcon sx={{ fontSize: '16px', color: '#fff !important' }} />}
        label={params.value}
        size="small"
        sx={{
          background: 'rgba(79, 163, 165, 0.75)', // Soft teal - caring & approachable
          backdropFilter: 'blur(10px) saturate(150%)',
          border: '1px solid rgba(79, 163, 165, 0.9)',
          color: '#fff',
          fontSize: '0.85rem',
        }}
      />
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
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
    field: 'location',
    headerName: 'Location',
    width: 220,
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
    field: 'experience',
    headerName: 'Experience',
    width: 120,
  },
  {
    field: 'availability',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          background:
            params.value === 'Available'
              ? 'rgba(255, 209, 102, 0.9)' // Golden yellow - attention without alarm
              : 'rgba(244, 162, 97, 0.7)', // Warm peach - empathy & connection
          backdropFilter: 'blur(10px) saturate(150%)',
          border:
            params.value === 'Available'
              ? '1px solid rgba(255, 209, 102, 0.95)'
              : '1px solid rgba(244, 162, 97, 0.9)',
          color: '#fff',
          fontSize: '0.8rem',
        }}
      />
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
];

function DoctorsPage() {
  const [searchText, setSearchText] = useState('');

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;

    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.specialty.toLowerCase().includes(searchLower) ||
        row.phone.toLowerCase().includes(searchLower) ||
        row.location.toLowerCase().includes(searchLower) ||
        row.experience.toLowerCase().includes(searchLower) ||
        row.availability.toLowerCase().includes(searchLower)
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
              bgcolor: 'rgba(79, 163, 165, 1.0)', // Soft teal - caring & approachable
              width: 48,
              height: 48,
            }}
          >
            <LocalHospitalIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}
            >
              Doctors & Specialists
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Find and connect with healthcare professionals specialized in your child's needs
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`${filteredRows.length} of ${rows.length} Doctors`}
              sx={{
                background: 'rgba(79, 163, 165, 0.75)', // Soft teal - caring & approachable
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
          placeholder="Search by name, specialty, location, or phone..."
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

export default DoctorsPage;
