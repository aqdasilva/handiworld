import { Box, Typography, Paper } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';

function AnalyticsPage() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 64,
        left: 70,
        right: 0,
        bottom: 0,
        p: 4,
        zIndex: 10,
        overflowY: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(240, 147, 251, 0.4)',
            }}
          >
            <AssessmentIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Analytics
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Analytics page content will go here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AnalyticsPage;