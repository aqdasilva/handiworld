import { Box, Card, CardContent, Typography, Avatar, AvatarGroup, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MotionCard = motion(Card);

function CoreProductTeamCard({ index = 0 }) {
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
              Core Product Team
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: '0.8rem',
                lineHeight: 1.4,
              }}
            >
              Core Product Team
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <AvatarGroup 
            max={3}
            sx={{
              '& .MuiAvatar-root': {
                width: 30,
                height: 30,
                fontSize: '0.85rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {['A', 'B'].map((letter, i) => (
              <Avatar
                key={i}
                sx={{ 
                  bgcolor: `hsl(${i * 90 + 180}, 60%, 55%)`,
                  fontWeight: 600,
                }}
              >
                {letter}
              </Avatar>
            ))}
          </AvatarGroup>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            2
          </Typography>
        </Box>
      </CardContent>
    </MotionCard>
  );
}

export default CoreProductTeamCard;