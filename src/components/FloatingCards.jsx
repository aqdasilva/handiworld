import { Box, Card, CardContent, Typography, Avatar, AvatarGroup, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MotionCard = motion(Card);

function FloatingCards() {
  const topRowCards = [
    {
      id: 'create',
      isCreateButton: true,
    },
    {
      id: 1,
      title: 'Events',
      subtitle: 'National Events',
      members: 3,
      avatars: ['A', 'B', 'C'],
    },
    {
      id: 2,
      title: 'Handicap Friendly Places',
      subtitle: 'Weekly Review',
      members: 9,
      avatars: ['A', 'B', 'C'],
    },
    {
      id: 3,
      title: 'Weekly Insights',
      subtitle: '',
      members: 0,
      hasChart: true,
    },
  ];

  const bottomRowCards = [
    {
      id: 4,
      title: 'Products & Toys',
      subtitle: 'Amazon, Walmart, Target & More',
      members: 0,
    },
    {
      id: 5,
      title: 'Doctors & Specialists',
      subtitle: 'Find a Doctor',
      members: 6,
      avatars: ['A'],
    },
    {
      id: 6,
      title: 'Core Product Team',
      subtitle: 'Core Product Team',
      members: 2,
      avatars: ['A', 'B'],
    },
    {
      id: 7,
      title: 'Email List',
      subtitle: 'Weekly Email List',
      members: 8,
      hasVideo: true,
    },
  ];

  const renderCard = (card, index, isTopRow) => {
    if (card.isCreateButton) {
      return (
        <MotionCard
          key={card.id}
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

    return (
      <MotionCard
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
        sx={{
          width: '100%',
          minHeight: card.hasVideo ? 220 : 140,
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
                {card.title}
              </Typography>
              {card.subtitle && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                  }}
                >
                  {card.subtitle}
                </Typography>
              )}
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

          {card.hasChart && (
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
          )}

          {card.hasVideo && (
            <Box
              sx={{
                height: 100,
                mb: 2,
                bgcolor: 'rgba(150, 100, 180, 0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(150, 100, 180, 0.3)',
                },
              }}
            >
              <PlayArrowIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 36 }} />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            {card.avatars && card.avatars.length > 0 ? (
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
                {card.avatars.map((letter, i) => (
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
            ) : (
              <Box />
            )}
            {card.members > 0 && (
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {card.members}
              </Typography>
            )}
          </Box>
        </CardContent>
      </MotionCard>
    );
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 60px 60px 60px',
        gap: 4,
      }}
    >
      {/* Top Row - 4 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          pointerEvents: 'auto',
        }}
      >
        {topRowCards.map((card, index) => renderCard(card, index, true))}
      </Box>

      {/* Bottom Row - 4 Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          pointerEvents: 'auto',
        }}
      >
        {bottomRowCards.map((card, index) => renderCard(card, index + 4, false))}
      </Box>
    </Box>
  );
}

export default FloatingCards;