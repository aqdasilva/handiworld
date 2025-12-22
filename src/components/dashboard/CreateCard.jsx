import { Box, Card, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';

const MotionCard = motion(Card);

function CreateCard({ index = 0 }) {
  return (
    <MotionCard
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
      sx={{
        width: '100%',
        height: 180,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(25px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      <Box sx={{ textAlign: 'center' }}>
        <IconButton
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
          }}
        >
          <AddIcon sx={{ fontSize: 28, color: '#fff' }} />
        </IconButton>
        <Typography sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', fontWeight: 500 }}>
          Create New Event
        </Typography>
      </Box>
    </MotionCard>
  );
}

export default CreateCard;