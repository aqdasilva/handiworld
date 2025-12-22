/* eslint-disable react-hooks/purity */
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MotionCard = motion(Card);

function WeeklyInsightsCard({ index = 0 }) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
      sx={{
        width: '100%',
        minHeight: 140,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(25px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          background: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#fff', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                mb: 0.5,
                lineHeight: 1.3,
              }}
            >
              Weekly Insights
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: '#fff',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ height: 50, mb: 2, display: 'flex', alignItems: 'flex-end', gap: 0.4 }}>
          {[...Array(24)].map((_, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: `${20 + Math.random() * 80}%`,
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box />
        </Box>
      </CardContent>
    </MotionCard>
  );
}

export default WeeklyInsightsCard;