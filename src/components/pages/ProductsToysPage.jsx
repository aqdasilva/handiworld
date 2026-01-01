import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Avatar, TextField, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import ToysIcon from '@mui/icons-material/Toys';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';

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

// Sample data for products and toys
const rows = [
  {
    id: 1,
    name: 'Weighted Blanket for Kids',
    category: 'Sensory',
    disability: 'Autism, Anxiety',
    price: 49.99,
    retailer: 'Amazon',
    ageRange: '5-12 years',
    rating: 4.8,
    link: 'https://amazon.com',
  },
  {
    id: 2,
    name: 'Adaptive Tricycle',
    category: 'Mobility',
    disability: 'Physical Disability',
    price: 299.99,
    retailer: 'Walmart',
    ageRange: '3-8 years',
    rating: 4.9,
    link: 'https://walmart.com',
  },
  {
    id: 3,
    name: 'Speech Therapy Flash Cards',
    category: 'Educational',
    disability: 'Speech Delay',
    price: 24.99,
    retailer: 'Target',
    ageRange: '2-6 years',
    rating: 4.7,
    link: 'https://target.com',
  },
  {
    id: 4,
    name: 'Fidget Sensory Toys Set',
    category: 'Sensory',
    disability: 'ADHD, Autism',
    price: 19.99,
    retailer: 'Amazon',
    ageRange: '3-10 years',
    rating: 4.6,
    link: 'https://amazon.com',
  },
  {
    id: 5,
    name: 'Adjustable Special Needs Chair',
    category: 'Seating',
    disability: 'Cerebral Palsy',
    price: 189.99,
    retailer: 'Walmart',
    ageRange: '5-15 years',
    rating: 4.8,
    link: 'https://walmart.com',
  },
  {
    id: 6,
    name: 'Visual Schedule Cards',
    category: 'Educational',
    disability: 'Autism',
    price: 29.99,
    retailer: 'Amazon',
    ageRange: '3-12 years',
    rating: 4.7,
    link: 'https://amazon.com',
  },
  {
    id: 7,
    name: 'Grip Adaptive Utensils',
    category: 'Daily Living',
    disability: 'Fine Motor Delay',
    price: 34.99,
    retailer: 'Target',
    ageRange: '2-8 years',
    rating: 4.9,
    link: 'https://target.com',
  },
  {
    id: 8,
    name: 'Balance Board Therapy',
    category: 'Physical Therapy',
    disability: 'Coordination Issues',
    price: 59.99,
    retailer: 'Amazon',
    ageRange: '4-12 years',
    rating: 4.8,
    link: 'https://amazon.com',
  },
  {
    id: 9,
    name: 'Noise-Canceling Headphones',
    category: 'Sensory',
    disability: 'Autism, Sensory Processing',
    price: 79.99,
    retailer: 'Target',
    ageRange: '5-15 years',
    rating: 4.9,
    link: 'https://target.com',
  },
  {
    id: 10,
    name: 'Adaptive Clothing Set',
    category: 'Clothing',
    disability: 'Physical Disability',
    price: 44.99,
    retailer: 'Walmart',
    ageRange: '3-10 years',
    rating: 4.6,
    link: 'https://walmart.com',
  },
  {
    id: 11,
    name: 'Communication Picture Board',
    category: 'Communication',
    disability: 'Non-verbal, Autism',
    price: 39.99,
    retailer: 'Amazon',
    ageRange: '2-10 years',
    rating: 4.8,
    link: 'https://amazon.com',
  },
  {
    id: 12,
    name: 'Therapy Swing',
    category: 'Sensory',
    disability: 'Autism, Sensory Processing',
    price: 69.99,
    retailer: 'Target',
    ageRange: '3-12 years',
    rating: 4.9,
    link: 'https://target.com',
  },
];

const columns = [
  {
    field: 'name',
    headerName: 'Product Name',
    width: 220,
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
          <ToysIcon sx={{ fontSize: '18px' }} />
        </Avatar>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
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
        icon={<CategoryIcon sx={{ fontSize: '16px', color: '#fff !important' }} />}
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
    field: 'disability',
    headerName: 'Helps With',
    width: 180,
    renderCell: (params) => (
      <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.85rem' }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <AttachMoneyIcon sx={{ fontSize: '16px', color: 'rgba(255, 209, 102, 1.0)' }} /> {/* Golden yellow */}
        <Typography sx={{ color: 'rgba(255, 209, 102, 1.0)', fontSize: '0.9rem', fontWeight: 600 }}>
          {params.value.toFixed(2)}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'retailer',
    headerName: 'Retailer',
    width: 120,
    renderCell: (params) => {
      const colors = {
        Amazon: 'rgba(255, 209, 102, 0.9)', // Golden yellow - attention without alarm
        Walmart: 'rgba(79, 163, 165, 0.75)', // Soft teal - caring & approachable
        Target: 'rgba(244, 162, 97, 0.7)', // Warm peach - empathy & connection
      };
      const borderColors = {
        Amazon: 'rgba(255, 209, 102, 0.95)',
        Walmart: 'rgba(79, 163, 165, 0.9)',
        Target: 'rgba(244, 162, 97, 0.9)',
      };
      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            background: colors[params.value] || 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px) saturate(150%)',
            border: `1px solid ${borderColors[params.value] || 'rgba(255, 255, 255, 0.4)'}`,
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        />
      );
    },
  },
  {
    field: 'ageRange',
    headerName: 'Age Range',
    width: 130,
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
    field: 'link',
    headerName: 'Link',
    width: 100,
    renderCell: (params) => (
      <IconButton
        size="small"
        onClick={() => window.open(params.value, '_blank')}
        sx={{
          color: '#fff', // White for better contrast
          backgroundColor: 'rgba(79, 163, 165, 0.75)',
          '&:hover': {
            backgroundColor: 'rgba(79, 163, 165, 0.9)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <OpenInNewIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    ),
  },
];

function ProductsToysPage() {
  const [searchText, setSearchText] = useState('');

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;

    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.category.toLowerCase().includes(searchLower) ||
        row.disability.toLowerCase().includes(searchLower) ||
        row.retailer.toLowerCase().includes(searchLower) ||
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
              bgcolor: 'rgba(79, 163, 165, 1.0)', // Soft teal - caring & approachable
              width: 48,
              height: 48,
            }}
          >
            <ToysIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}
            >
              Products & Toys
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Discover helpful products and toys designed to support children with special needs
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label={`${filteredRows.length} of ${rows.length} Products`}
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
          placeholder="Search by product name, category, disability, or retailer..."
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

export default ProductsToysPage;
